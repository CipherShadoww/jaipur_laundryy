import Link from "next/link";

const trustItems = [
  {
    icon: "🛡️",
    title: "100% Safe & Hygienic Cleaning",
  },
  {
    icon: "⚡",
    title: "24–48 Hour Express Service",
  },
  {
    icon: "🚚",
    title: "Free Pickup & Drop on Orders Above ₹499",
  },
  {
    icon: "💰",
    title: "₹100 Pickup Charge for Orders Below ₹499",
  },
  {
    icon: "😊",
    title: "Trusted Customer Service",
  },
  {
    icon: "✨",
    title: "Premium Fabric Care",
  },
];

export default function TrustBadgesSection() {
  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
            Trusted By Thousands Of Happy Customers
          </h2>
          <h3 className="text-gray-600 text-lg font-medium mb-4">
            We provide premium laundry services with quality, trust and customer
            satisfaction at every step.
          </h3>
          <Link
            href="/our-services"
            className="inline-flex items-center gap-2 text-primary-500 font-semibold hover:text-primary-600 text-sm transition-colors duration-200"
          >
            See our case studies
            <i className="fa-solid fa-long-arrow-right" />
          </Link>
        </div>

        {/* Trust Badge Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {trustItems.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all duration-200"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-xs font-semibold text-gray-700 leading-tight">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
