"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../../../context/CartContext";

export default function CartPage() {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Create order for the first item (simplified for this demo as the backend expects a single serviceId per order, or we can just send the highest value item)
      // For a real production app, the backend would support multiple items per order or we loop.
      // Here we will just create multiple orders, one for each cart item for simplicity, or just one order if they only have one.
      
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      
      for (const item of cart) {
        const res = await fetch(`${API_URL}/api/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            serviceId: item.serviceId,
            quantity: item.quantity,
            address,
            notes,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to place order. Please try again.");
        }
      }

      setSuccess(true);
      clearCart();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <i className="fa-solid fa-check text-4xl text-green-500" />
          </div>
          <div>
            <h2 className="mt-6 text-3xl font-black text-gray-900">Order Placed!</h2>
            <p className="mt-2 text-sm text-gray-500">
              Your laundry order has been successfully placed. Our delivery executive will pick up your items shortly.
            </p>
          </div>
          <Link
            href="/shop"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-basket-shopping text-4xl text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any laundry services yet.</p>
            <Link
              href="/shop"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              {cart.map((item) => (
                <div key={item.serviceId} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-20 h-20 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-shirt text-2xl text-primary-500" />
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">₹{item.pricePerUnit} / {item.unit}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.serviceId, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                    >
                      <i className="fa-solid fa-minus text-xs" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.serviceId, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                    >
                      <i className="fa-solid fa-plus text-xs" />
                    </button>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <div className="font-bold text-gray-900 text-lg">₹{item.pricePerUnit * item.quantity}</div>
                    <button
                      onClick={() => removeFromCart(item.serviceId)}
                      className="text-red-500 text-sm font-medium hover:text-red-600 mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Pickup & Delivery</span>
                    <span className="text-green-500">Free</span>
                  </div>
                </div>
                
                <div className="flex justify-between text-xl font-black text-gray-900 mb-8">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>

                <form onSubmit={handleCheckout} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                      {error}
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pickup/Delivery Address *</label>
                    <textarea
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                      rows={3}
                      placeholder="Enter your full address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                      placeholder="E.g., Please use fabric softener"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-4 shadow-md shadow-primary-500/20 disabled:opacity-70"
                  >
                    {loading ? (
                      <i className="fa-solid fa-circle-notch fa-spin" />
                    ) : (
                      <>
                        Confirm Order <i className="fa-solid fa-arrow-right" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-4">
                    By confirming, you agree to our terms of service and laundry policies.
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
