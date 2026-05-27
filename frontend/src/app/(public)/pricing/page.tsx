import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing Plan | LUXURY LAUNDRY.",
  description:
    "Transparent and affordable laundry pricing. Wash & Fold from ₹110/kg, Steam Iron ₹165/kg, Dry Cleaning from ₹220/piece.",
};

const pricingPlans = [
  {
    name: "Basic Wash",
    subtitle: "Everyday Clothes",
    price: "110",
    unit: "/kg",
    description: "Perfect for everyday cotton and blended fabrics",
    features: [
      "Machine wash with premium detergent",
      "Tumble dry",
      "Neatly folded",
      "Free delivery above ₹499",
      "24–48 hour turnaround",
    ],
    cta: "Book Wash & Fold",
    popular: false,
    color: "border-gray-200",
    btnClass: "border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white",
  },
  {
    name: "Premium Wash",
    subtitle: "Washed + Steam Ironed",
    price: "165",
    unit: "/kg",
    description: "Deep cleaning with a crisp, professional finish",
    features: [
      "Premium machine wash",
      "Professional steam ironing",
      "Crisp finish, wrinkle-free",
      "Suitable for formal wear",
      "Free delivery above ₹499",
      "24–48 hour turnaround",
    ],
    cta: "Book Wash & Iron",
    popular: true,
    color: "border-primary-500",
    btnClass: "bg-primary-500 text-white hover:bg-primary-600",
  },
  {
    name: "Dry Cleaning",
    subtitle: "Luxury & Delicate Garments",
    price: "220",
    unit: "/piece onwards",
    description: "Expert care for suits, sarees & luxury items",
    features: [
      "Professional dry cleaning",
      "Expert handling of delicates",
      "Suits, sarees, lehengas, jackets",
      "Garment bag packaging",
      "Free delivery above ₹499",
      "48–72 hour turnaround",
    ],
    cta: "Book Dry Cleaning",
    popular: false,
    color: "border-gray-200",
    btnClass: "border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white",
  },
];

const additionalPricing = [
  { service: "Shoe Spa (Basic)", price: "₹149/pair" },
  { service: "Shoe Spa (Premium)", price: "₹249/pair" },
  { service: "Curtains", price: "₹49/sq.ft" },
  { service: "Bedsheet (Single)", price: "₹89/piece" },
  { service: "Bedsheet (Double)", price: "₹119/piece" },
  { service: "Blanket / Quilt", price: "₹199/piece" },
  { service: "Sofa Cover", price: "₹149+/piece" },
  { service: "Carpet (per sq.ft)", price: "₹29/sq.ft" },
];

export default function PricingPage() {
  return (
    <>
      {/* Page Hero */}
      <section
        className="relative h-48 flex items-center bg-gray-800"
        style={{
          backgroundImage: "url('/images/wash_fold.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-white">Pricing</h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <i className="fa-solid fa-chevron-right text-xs" />
            <span className="text-white">Pricing Plan</span>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            No hidden fees, no surprises. What you see is what you pay. Free
            pickup & delivery on orders above ₹499.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl border-2 ${plan.color} p-8 flex flex-col ${
                  plan.popular ? "shadow-xl scale-105" : "shadow-sm"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                {/* Plan name */}
                <div className="mb-6">
                  <h3 className="text-xl font-black text-gray-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500">{plan.subtitle}</p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-sm text-gray-500 font-medium">₹</span>
                  <span className="text-5xl font-black text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-sm text-gray-500">{plan.unit}</span>
                </div>

                <p className="text-sm text-gray-500 mb-6">{plan.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2.5 text-sm text-gray-700"
                    >
                      <i className="fa-solid fa-check text-primary-500 mt-0.5 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contactus"
                  className={`w-full text-center py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${plan.btnClass}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Pricing */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">
            Additional Services Pricing
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {additionalPricing.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-6 py-4 ${
                  i !== additionalPricing.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <span className="text-gray-700 font-medium text-sm">
                  {item.service}
                </span>
                <span className="text-primary-600 font-bold text-sm">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pickup Policy */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🚚</div>
              <h3 className="font-bold text-gray-900 mb-2">
                Free Pickup & Delivery
              </h3>
              <p className="text-sm text-gray-600">
                On orders above <strong>₹499</strong>
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-bold text-gray-900 mb-2">₹100 Pickup Charge</h3>
              <p className="text-sm text-gray-600">
                For orders <strong>below ₹499</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 hero-gradient text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-4">Start Your First Order</h2>
          <p className="text-blue-100 mb-8">
            Book a pickup today and experience premium laundry care at your
            doorstep.
          </p>
          <Link
            href="/contactus"
            className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg"
          >
            Book Free Pickup
          </Link>
        </div>
      </section>
    </>
  );
}
