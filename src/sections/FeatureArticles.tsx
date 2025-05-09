'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/supabase/supabase';

export default function FeaturedArticles() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching featured articles:', error);
      } else {
        setArticles(data);
      }
    };

    fetchFeaturedArticles();
  }, []);

  const truncateWords = (text: string, wordLimit: number) => {
    return text.split(' ').slice(0, wordLimit).join(' ') + '...';
  };

  return (
    <section className="py-20 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading and View All Button - Top for desktop only */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-green-600 font-semibold uppercase text-sm tracking-wide">
              Featured Articles
            </p>
            <p className="text-4xl md:text-5xl text-gray-900 mt-2">
              Explore Expert Insights 
            </p>
          </div>
          <Link
            href="/articles"
            className="hidden md:inline-flex items-center gap-2 text-green-600 hover:underline font-medium"
          >
            View All Articles <ArrowRight size={16} />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {articles.length > 0 ? (
            articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col hover:-translate-y-1 duration-300"
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
                  <h3 className="text-lg font-bold text-black mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {truncateWords(article.description || '', 15)}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 col-span-3 text-center">No featured articles found.</p>
          )}
        </div>

        {/* Mobile View All Button */}
        <div className="md:hidden text-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-green-600 hover:underline font-medium border border-green-600 px-4 py-2 rounded-lg"
          >
            View All Articles <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
