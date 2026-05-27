import { Router, Response } from "express";
import prisma from "../lib/prisma";
import { authenticate, adminOnly, AuthRequest } from "../middleware/auth";

const router = Router();

// GET /api/orders — admin gets all, customer gets own
router.get("/", authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const where = req.user!.role === "ADMIN" ? {} : { customerId: req.user!.id };
    const orders = await prisma.order.findMany({
      where,
      include: {
        customer: { select: { id: true, name: true, email: true, phone: true } },
        service: { select: { id: true, name: true, unit: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(orders);
  } catch (err) {
    console.error("Get orders error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/orders — create a new order
router.post("/", authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { serviceId, quantity, address, notes, pickupDate } = req.body;
    if (!serviceId || !quantity || !address) {
      res.status(400).json({ message: "serviceId, quantity, and address are required" });
      return;
    }
    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) {
      res.status(404).json({ message: "Service not found" });
      return;
    }
    const totalAmount = service.pricePerUnit * quantity;
    const order = await prisma.order.create({
      data: {
        customerId: req.user!.id,
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
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/orders/:id — update order (status, dates, etc.)
router.patch("/:id", authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    // Only admin or the order's customer can update
    if (req.user!.role !== "ADMIN" && order.customerId !== req.user!.id) {
      res.status(403).json({ message: "Not authorized" });
      return;
    }
    const { status, pickupDate, deliveryDate, notes } = req.body;
    const data: Record<string, unknown> = {};
    if (status) data.status = status;
    if (pickupDate) data.pickupDate = new Date(pickupDate);
    if (deliveryDate) data.deliveryDate = new Date(deliveryDate);
    if (notes !== undefined) data.notes = notes;

    const updated = await prisma.order.update({
      where: { id },
      data: data as any,
      include: {
        customer: { select: { name: true, email: true } },
        service: { select: { name: true } },
      },
    });
    res.json(updated);
  } catch (err) {
    console.error("Update order error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/orders/:id — admin only
router.delete("/:id", authenticate, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await prisma.order.delete({ where: { id: req.params.id as string } });
    res.json({ message: "Order deleted" });
  } catch (err) {
    console.error("Delete order error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
