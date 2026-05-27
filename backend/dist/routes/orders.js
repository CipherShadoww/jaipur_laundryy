"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// GET /api/orders — admin gets all, customer gets own
router.get("/", auth_1.authenticate, async (req, res) => {
    try {
        const where = req.user.role === "ADMIN" ? {} : { customerId: req.user.id };
        const orders = await prisma_1.default.order.findMany({
            where,
            include: {
                customer: { select: { id: true, name: true, email: true, phone: true } },
                service: { select: { id: true, name: true, unit: true } },
            },
            orderBy: { createdAt: "desc" },
        });
        res.json(orders);
    }
    catch (err) {
        console.error("Get orders error:", err);
        res.status(500).json({ message: "Server error" });
    }
});
// POST /api/orders — create a new order
router.post("/", auth_1.authenticate, async (req, res) => {
    try {
        const { serviceId, quantity, address, notes, pickupDate } = req.body;
        if (!serviceId || !quantity || !address) {
            res.status(400).json({ message: "serviceId, quantity, and address are required" });
            return;
        }
        const service = await prisma_1.default.service.findUnique({ where: { id: serviceId } });
        if (!service) {
            res.status(404).json({ message: "Service not found" });
            return;
        }
        const totalAmount = service.pricePerUnit * quantity;
        const order = await prisma_1.default.order.create({
            data: {
                customerId: req.user.id,
                serviceId,
                quantity,
                totalAmount,
                address,
                notes: notes || null,
                pickupDate: pickupDate ? new Date(pickupDate) : null,
                status: "PENDING",
            },
            include: {
                customer: { select: { name: true, email: true } },
                service: { select: { name: true } },
            },
        });
        res.status(201).json(order);
    }
    catch (err) {
        console.error("Create order error:", err);
        res.status(500).json({ message: "Server error" });
    }
});
// PATCH /api/orders/:id — update order (status, dates, etc.)
router.patch("/:id", auth_1.authenticate, async (req, res) => {
    try {
        const id = req.params.id;
        const order = await prisma_1.default.order.findUnique({ where: { id } });
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        // Only admin or the order's customer can update
        if (req.user.role !== "ADMIN" && order.customerId !== req.user.id) {
            res.status(403).json({ message: "Not authorized" });
            return;
        }
        const { status, pickupDate, deliveryDate, notes } = req.body;
        const data = {};
        if (status)
            data.status = status;
        if (pickupDate)
            data.pickupDate = new Date(pickupDate);
        if (deliveryDate)
            data.deliveryDate = new Date(deliveryDate);
        if (notes !== undefined)
            data.notes = notes;
        const updated = await prisma_1.default.order.update({
            where: { id },
            data: data,
            include: {
                customer: { select: { name: true, email: true } },
                service: { select: { name: true } },
            },
        });
        res.json(updated);
    }
    catch (err) {
        console.error("Update order error:", err);
        res.status(500).json({ message: "Server error" });
    }
});
// DELETE /api/orders/:id — admin only
router.delete("/:id", auth_1.authenticate, auth_1.adminOnly, async (req, res) => {
    try {
        await prisma_1.default.order.delete({ where: { id: req.params.id } });
        res.json({ message: "Order deleted" });
    }
    catch (err) {
        console.error("Delete order error:", err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
//# sourceMappingURL=orders.js.map