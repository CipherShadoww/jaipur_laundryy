"use client";

import { useState, useEffect } from "react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  createdAt: string;
  _count?: { orders: number };
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => { fetchCustomers(); }, []);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/customers`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setCustomers(await res.json());
    } catch { /* ignore */ } finally { setLoading(false); }
  };

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-1">{customers.length} registered customers</p>
        </div>
        <input type="search" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="form-input py-2 text-sm w-64" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full admin-table">
            <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Orders</th><th>Joined</th></tr></thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>{[...Array(6)].map((_, j) => (<td key={j}><div className="h-4 w-20 skeleton rounded" /></td>))}</tr>
                ))
              ) : filtered.length > 0 ? (
                filtered.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary-600 font-bold text-xs">{c.name.charAt(0)}</span>
                        </div>
                        <span className="font-medium">{c.name}</span>
                      </div>
                    </td>
                    <td>{c.email}</td>
                    <td>{c.phone || "—"}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${c.role === "ADMIN" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-700"}`}>
                        {c.role}
                      </span>
                    </td>
                    <td>{c._count?.orders ?? 0}</td>
                    <td className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="text-center text-gray-400 py-12">No customers found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
