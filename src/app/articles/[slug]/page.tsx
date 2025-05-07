'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/supabase/supabase';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronRight, Home } from 'lucide-react';

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching article:', error);
      } else {
        setArticle(data);
        fetchRelatedArticles(data);
      }
    };

    const fetchRelatedArticles = async (currentArticle: any) => {
      if (!currentArticle) return;

      let query = supabase
        .from('articles')
        .select('*')
        .neq('slug', currentArticle.slug)
        .limit(6);

      if (currentArticle.tags?.length > 0) {
        query = query.overlaps('tags', currentArticle.tags);
      } else if (currentArticle.category) {
        query = query.eq('category', currentArticle.category);
      }

      const { data, error } = await query;
      if (error) {
        console.error('Error fetching related articles:', error);
      } else {
        setRelatedArticles(data);
      }
    };

    fetchArticle();
  }, [slug]);

  if (!article) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <p className="text-gray-500">Loading article...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50 pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-1 text-gray-500 hover:text-green-600">
              <Home size={16} /> Home
            </Link>
            <ChevronRight size={16} />
            <Link href="/articles" className="hover:text-green-600">Articles</Link>
            <ChevronRight size={16} />
            <span className="font-semibold text-black">{article.title}</span>
          </nav>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Article Left */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">{article.title}</h1>
              <div className="text-gray-500 text-sm mb-4">
  Published on {new Date(article.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}
</div>


              {/* Feature Image */}
              {article.image_url && (
                <div className="mb-8">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="rounded-xl w-full max-h-[500px] object-cover shadow"
                  />
                </div>
              )}

              {/* Short Description */}
              {article.description && (
  <div className="text-gray-700 text-lg mb-6 space-y-4">
    {article.description.split('\n').map((para: string, index: number) => (
      <p key={index}>
        {para.trim()}
      </p>
    ))}
  </div>
)}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags?.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* Full Content */}
              <div className="prose prose-green max-w-none">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>
            </div>

            {/* Related Articles Right */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-black mb-4">Related Articles</h2>
              {relatedArticles.length > 0 ? (
                relatedArticles.map((related) => (
                  <Link
                    href={`/articles/${related.slug}`}
                    key={related.id}
                    className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow hover:shadow-md hover:-translate-y-1 transition duration-300"
                  >
                    <img
                      src={related.image_url || '/images/default-article.jpg'}
                      alt={related.title}
                      className="rounded-lg w-20 h-20 object-cover flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-md font-bold text-black leading-tight mb-1">
                        {related.title}
                      </h3>
                      <div className="text-gray-500 text-sm mb-4">
   {new Date(article.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}
</div>

                      <p className="text-gray-500 text-sm">
                        {related.description?.split(' ').slice(0, 17).join(' ')}...
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-400">No related articles found.</p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
