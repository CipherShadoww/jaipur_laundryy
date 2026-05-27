"use client";

import { useState, useEffect } from "react";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  PICKED_UP: "bg-indigo-100 text-indigo-800",
  PROCESSING: "bg-cyan-100 text-cyan-800",
  READY: "bg-teal-100 text-teal-800",
  OUT_FOR_DELIVERY: "bg-orange-100 text-orange-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const allStatuses = ["PENDING", "CONFIRMED", "PICKED_UP", "PROCESSING", "READY", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"];

interface Order {
  id: string;
  customer?: { name: string; email: string };
  service?: { name: string };
  status: string;
  quantity: number;
  totalAmount: number;
  address: string;
  notes?: string;
  pickupDate?: string;
  deliveryDate?: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [editingId, setEditingId] = useState<string | null>(null);

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/orders/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
        setEditingId(null);
      }
    } catch { /* ignore */ }
  };

  const filtered = filter === "ALL" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500 mt-1">{orders.length} total orders</p>
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="form-input py-2 text-sm w-48">
          <option value="ALL">All Statuses</option>
          {allStatuses.map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Address</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(9)].map((_, j) => (
                      <td key={j}><div className="h-4 w-16 skeleton rounded" /></td>
                    ))}
                  </tr>
                ))
              ) : filtered.length > 0 ? (
                filtered.map((order) => (
                  <tr key={order.id}>
                    <td className="font-mono text-xs">{order.id.slice(0, 8)}...</td>
                    <td>
                      <div className="font-medium">{order.customer?.name || "—"}</div>
                      <div className="text-xs text-gray-400">{order.customer?.email}</div>
                    </td>
                    <td>{order.service?.name || "—"}</td>
                    <td>{order.quantity}</td>
                    <td className="font-semibold">₹{order.totalAmount}</td>
                    <td className="max-w-[150px] truncate text-xs">{order.address}</td>
                    <td>
                      {editingId === order.id ? (
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          onBlur={() => setEditingId(null)}
                          autoFocus
                          className="form-input py-1 text-xs w-36"
                        >
                          {allStatuses.map((s) => (
                            <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
                          ))}
                        </select>
                      ) : (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold cursor-pointer ${statusColors[order.status] || "bg-gray-100 text-gray-800"}`}
                          onClick={() => setEditingId(order.id)}
                          title="Click to change status"
                        >
                          {order.status.replace(/_/g, " ")}
                        </span>
                      )}
                    </td>
                    <td className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => setEditingId(order.id === editingId ? null : order.id)} className="text-primary-500 hover:text-primary-600 text-xs font-semibold">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center text-gray-400 py-12">
                    {filter !== "ALL" ? `No ${filter.replace(/_/g, " ").toLowerCase()} orders found.` : "No orders yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
