import { Router, Response } from "express";
import prisma from "../lib/prisma";
import { authenticate, adminOnly, AuthRequest } from "../middleware/auth";

const router = Router();

// GET /api/customers — admin only
router.get("/", authenticate, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const customers = await prisma.user.findMany({
      select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true, _count: { select: { orders: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(customers);
  } catch (err) {
    console.error("Get customers error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/customers/:id
router.get("/:id", authenticate, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const customer = await prisma.user.findUnique({
      where: { id: req.params.id as string },
      select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true, orders: { include: { service: { select: { name: true } } }, orderBy: { createdAt: "desc" } } },
    });
    if (!customer) { res.status(404).json({ message: "Customer not found" }); return; }
    res.json(customer);
  } catch (err) {
    console.error("Get customer error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/customers/:id
router.patch("/:id", authenticate, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, phone, role } = req.body;
    const data: Record<string, unknown> = {};
    if (name) data.name = name;
    if (phone !== undefined) data.phone = phone;
    if (role) data.role = role;
    const updated = await prisma.user.update({ where: { id: req.params.id as string }, data, select: { id: true, name: true, email: true, phone: true, role: true } });
    res.json(updated);
  } catch (err) {
    console.error("Update customer error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
