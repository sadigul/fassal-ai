'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Loader2 } from 'lucide-react';
import { supabase } from '@/supabase/supabase';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching news:', error);
      } else {
        setNewsItems(data);
      }
      setIsLoading(false);
    };
    fetchNews();
  }, []);

  const truncateWords = (text: string, wordLimit: number) => {
    return text.split(' ').slice(0, wordLimit).join(' ') + '...';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pt-28 px-6 pb-16">
      <Navbar />

      <main className="flex-1 mb-50">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-1 text-gray-500 hover:text-green-600">
              <Home size={16} /> Home
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="font-semibold text-black">News</span>
          </nav>

          <h1 className="text-3xl font-extrabold text-black mb-10">Latest News</h1>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {isLoading ? (
              <div className="col-span-3 flex justify-center items-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-green-600" />
              </div>
            ) : newsItems.length > 0 ? (
              newsItems.map((news) => (
                <Link
                  key={news.id}
                  href={`/news/${news.slug}`}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col hover:-translate-y-1 duration-300"
                >
                  <div className="relative">
                    <img
                      src={news.image_url || '/images/default-news.jpg'}
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
                      {truncateWords(news.description || '', 15)}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {news.created_at ? new Date(news.created_at).toLocaleDateString() : ''}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-400 text-center col-span-3">No news articles found.</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
