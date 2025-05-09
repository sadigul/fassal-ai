"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/supabase/supabase";
import { ArrowRight } from "lucide-react";

export default function FeaturedNews() {
  const [newsItems, setNewsItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchFeaturedNews = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("is_featured", true)
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) {
        console.error("Error fetching featured news:", error);
      } else {
        setNewsItems(data);
      }
    };
    fetchFeaturedNews();
  }, []);

  const truncateWords = (text: string, wordLimit: number) => {
    return text.split(" ").slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <section className="py-20 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading for Desktop */}
        <div className="hidden md:flex items-center justify-between mb-8">
          <div>
            <p className="text-green-600 font-semibold uppercase text-sm tracking-wide">
              Featured News
            </p>
            <p className="text-4xl md:text-5xl text-gray-900 mt-2">
              Stay Updated What's Happening
            </p>
          </div>
          <Link
            href="/news"
            className="flex items-center gap-2 text-green-600 hover:underline font-medium whitespace-nowrap border border-green-600 px-4 py-2 rounded-lg"
          >
            View All News <ArrowRight size={16} />
          </Link>
        </div>

        {/* Heading for Mobile */}
        <div className="md:hidden mb-8">
          <p className="text-green-600 font-semibold uppercase text-sm tracking-wide">
            Featured News
          </p>
          <p className="text-4xl text-gray-900 mt-2">
            Stay Updated What's Happening
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.length > 0 ? (
            newsItems.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.slug}`}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col hover:-translate-y-1 duration-300"
              >
                <div className="relative">
                  <img
                    src={news.image_url || "/images/default-news.jpg"}
                    alt={news.title}
                    className="rounded-xl w-full h-48 object-cover"
                  />
                  {news.category && (
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                      {news.category}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-black mb-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {truncateWords(news.description || "", 15)}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-3">No featured news found.</p>
          )}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-green-600 hover:underline font-medium border border-green-600 px-4 py-2 rounded-lg"
          >
            View All News <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
