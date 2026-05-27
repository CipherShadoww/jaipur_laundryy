import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "News | LUXURY LAUNDRY.",
  description: "Latest news, tips, and updates from LuxWash Premium Laundry.",
};

const posts = [
  {
    id: 1,
    title: "5 Tips to Keep Your Clothes Fresh Between Washes",
    excerpt: "Learn expert techniques to maintain garment freshness, reduce wrinkles, and extend the life of your favorite outfits between laundry cycles.",
    date: "May 25, 2026",
    category: "Tips & Tricks",
    readTime: "4 min read",
    image: "/images/wash_fold.png",
  },
  {
    id: 2,
    title: "Why Dry Cleaning is Essential for Premium Garments",
    excerpt: "Discover why professional dry cleaning is the safest and most effective way to care for suits, sarees, lehengas, and other luxury fabrics.",
    date: "May 20, 2026",
    category: "Garment Care",
    readTime: "5 min read",
    image: "/images/dry_cleaning.png",
  },
  {
    id: 3,
    title: "LuxWash Now Offers Free Pickup Across Jaipur!",
    excerpt: "Great news! We've expanded our free pickup and delivery service across all major areas of Jaipur for orders above ₹499.",
    date: "May 15, 2026",
    category: "Announcements",
    readTime: "2 min read",
    image: "/images/delivery_service.png",
  },
  {
    id: 4,
    title: "Understanding Fabric Care Labels: A Complete Guide",
    excerpt: "Those tiny symbols on your clothes actually mean something important. Here's your guide to understanding every fabric care label.",
    date: "May 10, 2026",
    category: "Education",
    readTime: "6 min read",
    image: "/images/steam_iron.png",
  },
];

export default function NewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-48 flex items-center bg-gray-800"
        style={{ backgroundImage: "url('/images/hero_laundry.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-white">News & Blog</h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <i className="fa-solid fa-chevron-right text-xs" />
            <span className="text-white">News</span>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                <div className="relative h-56 overflow-hidden" style={{ backgroundImage: `url(${post.image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="bg-primary-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{post.category}</span>
                    <span className="text-white/80 text-xs">{post.readTime}</span>
                  </div>
                </div>
                <div className="p-6">
                  <time className="text-xs text-gray-400 font-medium">{post.date}</time>
                  <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2 group-hover:text-primary-500 transition-colors duration-200">{post.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 text-primary-500 font-semibold text-sm hover:gap-2.5 transition-all duration-200 cursor-pointer">
                    Read More <i className="fa-solid fa-arrow-right text-xs" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
