'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/supabase/supabase';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronRight, Home } from 'lucide-react';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching articles:', error);
      } else {
        setArticles(data);
      }
    };
    fetchArticles();
  }, []);

  const truncateWords = (text: string, wordLimit: number) => {
    return text.split(' ').slice(0, wordLimit).join(' ') + '...';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50 pt-28 px-6 pb-16">
        <div className="max-w-7xl mx-auto">

          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-600 mb-6 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-1 text-gray-500 hover:text-green-600">
              <Home size={16} /> Home
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="font-semibold text-black">Articles</span>
          </nav>

          {/* Title */}
          <h1 className="text-3xl font-extrabold text-black mb-10">All Articles</h1>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.length > 0 ? (
              articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4"
                >
                  <div className="relative">
                    <img
                      src={article.image_url || '/images/default-article.jpg'}
                      alt={article.title}
                      className="rounded-xl w-full h-48 object-cover"
                    />
                    {article.category && (
                      <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-black mb-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {truncateWords(article.description || '', 15)}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-400 text-center col-span-3">No articles found.</p>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
