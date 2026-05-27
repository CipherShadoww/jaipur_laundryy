"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// GET /api/dashboard/stats — admin only
router.get("/stats", auth_1.authenticate, auth_1.adminOnly, async (req, res) => {
    try {
        const [totalOrders, totalCustomers, totalServices, pendingOrders, revenueResult, recentOrders] = await Promise.all([
            prisma_1.default.order.count(),
            prisma_1.default.user.count({ where: { role: "CUSTOMER" } }),
            prisma_1.default.service.count({ where: { isActive: true } }),
            prisma_1.default.order.count({ where: { status: "PENDING" } }),
            prisma_1.default.order.aggregate({ _sum: { totalAmount: true } }),
            prisma_1.default.order.findMany({
                take: 10,
                orderBy: { createdAt: "desc" },
                include: {
                    customer: { select: { name: true } },
                    service: { select: { name: true } },
                },
            }),
        ]);
        res.json({
            totalOrders,
            totalCustomers,
            totalRevenue: revenueResult._sum.totalAmount || 0,
            totalServices,
            pendingOrders,
            recentOrders: recentOrders.map((o) => ({
                id: o.id,
                customerName: o.customer.name,
                serviceName: o.service.name,
                status: o.status,
                totalAmount: o.totalAmount,
                createdAt: o.createdAt,
            })),
        });
    }
    catch (err) {
        console.error("Dashboard stats error:", err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
//# sourceMappingURL=dashboard.js.map