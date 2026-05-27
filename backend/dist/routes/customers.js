"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// GET /api/customers — admin only
router.get("/", auth_1.authenticate, auth_1.adminOnly, async (req, res) => {
    try {
        const customers = await prisma_1.default.user.findMany({
            select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true, _count: { select: { orders: true } } },
            orderBy: { createdAt: "desc" },
        });
        res.json(customers);
    }
    catch (err) {
        console.error("Get customers error:", err);
        res.status(500).json({ message: "Server error" });
    }
});
// GET /api/customers/:id
router.get("/:id", auth_1.authenticate, auth_1.adminOnly, async (req, res) => {
    try {
        const customer = await prisma_1.default.user.findUnique({
            where: { id: req.params.id },
            select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true, orders: { include: { service: { select: { name: true } } }, orderBy: { createdAt: "desc" } } },
        });
        if (!customer) {
            res.status(404).json({ message: "Customer not found" });
            return;
        }
        res.json(customer);
    }
    catch (err) {
        console.error("Get customer error:", err);
        res.status(500).json({ message: "Server error" });
    }
});
// PATCH /api/customers/:id
router.patch("/:id", auth_1.authenticate, auth_1.adminOnly, async (req, res) => {
    try {
        const { name, phone, role } = req.body;
        const data = {};
        if (name)
            data.name = name;
        if (phone !== undefined)
            data.phone = phone;
        if (role)
            data.role = role;
        const updated = await prisma_1.default.user.update({ where: { id: req.params.id }, data, select: { id: true, name: true, email: true, phone: true, role: true } });
        res.json(updated);
    }
    catch (err) {
        console.error("Update customer error:", err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
//# sourceMappingURL=customers.js.map