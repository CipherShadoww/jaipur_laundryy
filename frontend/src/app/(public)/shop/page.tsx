import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop | LUXURY LAUNDRY.",
  description:
    "Browse and order our laundry services online. Wash & Fold, Steam Iron, Dry Cleaning and more.",
};

const products = [
  {
    id: "wash-fold-5kg",
    name: "Wash & Fold — 5kg Pack",
    price: 550,
    originalPrice: 650,
    image: "/images/wash_fold.png",
    badge: "Best Seller",
    badgeColor: "bg-green-500",
    rating: 4.8,
    reviews: 324,
    description: "5kg of everyday clothes — washed, dried & neatly folded.",
  },
  {
    id: "wash-iron-5kg",
    name: "Wash & Steam Iron — 5kg Pack",
    price: 825,
    originalPrice: 950,
    image: "/images/steam_iron.png",
    badge: "Premium",
    badgeColor: "bg-primary-500",
    rating: 4.9,
    reviews: 218,
    description: "5kg deep wash + crisp steam ironing for a perfect finish.",
  },
  {
    id: "dry-clean-suit",
    name: "Suit Dry Cleaning",
    price: 499,
    originalPrice: 599,
    image: "/images/dry_cleaning.png",
    badge: "Luxury",
    badgeColor: "bg-purple-600",
    rating: 4.9,
    reviews: 156,
    description: "Professional dry cleaning for one suit (blazer + trousers).",
  },
  {
    id: "dry-clean-saree",
    name: "Saree Dry Cleaning",
    price: 350,
    originalPrice: 450,
    image: "/images/dry_cleaning.png",
    badge: null,
    badgeColor: "",
    rating: 4.7,
    reviews: 198,
    description: "Expert silk & designer saree dry cleaning with fabric care.",
  },
  {
    id: "shoe-spa-basic",
    name: "Shoe Spa — Basic",
    price: 149,
    originalPrice: 199,
    image: "/images/hero_laundry.png",
    badge: "New",
    badgeColor: "bg-orange-500",
    rating: 4.6,
    reviews: 89,
    description: "Deep clean, deodorize, and polish for any pair of shoes.",
  },
  {
    id: "home-bedsheet",
    name: "Bedsheet Wash Pack",
    price: 299,
    originalPrice: 399,
    image: "/images/wash_fold.png",
    badge: null,
    badgeColor: "",
    rating: 4.5,
    reviews: 112,
    description: "2 double bedsheets — washed, ironed & neatly packed.",
  },
];

export default function ShopPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative h-48 flex items-center bg-gray-800"
        style={{
          backgroundImage: "url('/images/steam_iron.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-white">Shop</h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <i className="fa-solid fa-chevron-right text-xs" />
            <span className="text-white">Shop</span>
          </div>
        </div>
      </section>

      {/* Shop Grid */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Our Services</h2>
              <p className="text-gray-500 text-sm mt-1">Showing {products.length} service packs</p>
            </div>
            <div className="flex items-center gap-3">
              <select className="form-input py-2 text-sm w-48" defaultValue="popularity">
                <option value="popularity">Sort by: Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <div className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                      {product.badge}
                    </div>
                  )}
                  {/* Discount */}
                  {product.originalPrice > product.price && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fa-solid fa-star text-xs ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-gray-900">
                        ₹{product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button className="bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-1.5">
                      <i className="fa-solid fa-cart-plus text-xs" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
