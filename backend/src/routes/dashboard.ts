import { Router, Response } from "express";
import prisma from "../lib/prisma";
import { authenticate, adminOnly, AuthRequest } from "../middleware/auth";

const router = Router();

// GET /api/dashboard/stats — admin only
router.get("/stats", authenticate, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [totalOrders, totalCustomers, totalServices, pendingOrders, revenueResult, recentOrders] = await Promise.all([
      prisma.order.count(),
      prisma.user.count({ where: { role: "CUSTOMER" } }),
      prisma.service.count({ where: { isActive: true } }),
      prisma.order.count({ where: { status: "PENDING" } }),
      prisma.order.aggregate({ _sum: { totalAmount: true } }),
      prisma.order.findMany({
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
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
