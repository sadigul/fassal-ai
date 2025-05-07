'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/supabase/supabase';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronRight, Home, Loader2 } from 'lucide-react';

export default function NewsDetail() {
  const { slug } = useParams();
  const [news, setNews] = useState<any>(null);
  const [relatedNews, setRelatedNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching news:', error);
      } else {
        setNews(data);
        fetchRelatedNews(data);
      }
      setIsLoading(false);
    };

    const fetchRelatedNews = async (currentNews: any) => {
      if (!currentNews) return;

      let query = supabase
        .from('news')
        .select('*')
        .neq('slug', currentNews.slug)
        .limit(6);

      if (currentNews.tags?.length > 0) {
        query = query.overlaps('tags', currentNews.tags);
      } else if (currentNews.category) {
        query = query.eq('category', currentNews.category);
      }

      const { data, error } = await query;
      if (error) {
        console.error('Error fetching related news:', error);
      } else {
        setRelatedNews(data);
      }
    };

    fetchNews();
  }, [slug]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50 pt-24 pb-16 px-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="h-12 w-12 animate-spin text-green-600" />
          </div>
        ) : news ? (
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Left - Main News */}
            <div className="flex-1">
              {/* Breadcrumb */}
              <nav className="text-sm text-gray-600 mb-6 flex items-center gap-2">
                <Link href="/" className="flex items-center gap-1 text-gray-500 hover:text-green-600">
                  <Home size={16} /> Home
                </Link>
                <ChevronRight size={16} />
                <Link href="/news" className="hover:text-green-600">News</Link>
                <ChevronRight size={16} />
                <span className="font-semibold text-black">{news.title}</span>
              </nav>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">{news.title}</h1>

              {/* Date */}
              {news.created_at && (
                <p className="text-gray-500 text-sm mb-6">
                  Published on {new Date(news.created_at).toLocaleDateString()}
                </p>
              )}

              {/* Image */}
              {news.image_url && (
                <div className="mb-8">
                  <img
                    src={news.image_url}
                    alt={news.title}
                    className="rounded-xl w-full max-h-[500px] object-cover shadow"
                  />
                </div>
              )}

              {/* Description */}
              {news.description && (
                <div className="text-gray-700 text-lg mb-8 whitespace-pre-line leading-relaxed">
                  {news.description}
                </div>
              )}

              {/* Content */}
              {news?.content && (
                <div className="prose prose-green text-black max-w-none prose-a:text-blue-600 prose-a:no-underline prose-strong:font-bold prose-p:mb-4">
                  <div dangerouslySetInnerHTML={{ __html: news.content }} />
                </div>
              )}
            </div>

            {/* Right - Related News */}
            <div className="w-full md:w-1/3 mt-12 md:mt-0">
              {relatedNews.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold text-black mb-6">Related News</h2>
                  <div className="flex flex-col gap-6">
                    {relatedNews.map((related) => (
                      <Link
                        href={`/news/${related.slug}`}
                        key={related.id}
                        className="flex gap-4 items-center hover:underline"
                      >
                        <img
                          src={related.image_url || '/images/default-article.jpg'}
                          alt={related.title}
                          className="w-24 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-black text-sm">
                            {related.title}
                          </h3>
                          <p className="text-gray-600 text-xs">
                            {related.description?.split(' ').slice(0, 10).join(' ')}...
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center py-32">
            <p className="text-gray-500">News not found.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
