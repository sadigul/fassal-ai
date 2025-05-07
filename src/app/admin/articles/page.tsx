'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/supabase/supabase';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Plus, Edit2, Trash, Home, ChevronRight } from 'lucide-react';

export default function ManageArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
      if (error) console.error('Error fetching articles:', error);
      else setArticles(data);
    };
    fetchArticles();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this article?');
    if (!confirmDelete) return;

    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) {
      console.error('Delete Error:', error);
      alert('Failed to delete.');
    } else {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50 pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-8 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-1 text-gray-500 hover:text-green-600">
              <Home size={16} /> Home
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <Link href="/admin" className="hover:text-green-600">Admin</Link>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="font-semibold text-black">Articles</span>
          </nav>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-black">Manage Articles</h1>
            <Link
              href="/admin/articles/create"
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              <Plus size={18} /> Add New
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-xl shadow border">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-semibold">Title/Name</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Category/Type</th>
                  <th className="px-6 py-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.length > 0 ? (
                  articles.map((article) => (
                    <tr key={article.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 text-black font-medium">{article.title}</td>
                      <td className="px-6 py-4 text-gray-600">{new Date(article.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-gray-600">{article.category || 'Uncategorized'}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <Link
                            href={`/admin/articles/create?id=${article.id}`}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200"
                            title="Edit"
                          >
                            <Edit2 size={16} className="text-blue-600" />
                          </Link>
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="p-2 rounded-full bg-red-100 hover:bg-red-200"
                            title="Delete"
                          >
                            <Trash size={16} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 py-10">
                      No articles found yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
