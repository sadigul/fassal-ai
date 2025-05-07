'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/supabase/supabase';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Plus, Edit2, Trash, Home, ChevronRight } from 'lucide-react';

export default function ManageNews() {
  const [newsList, setNewsList] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching news:', error);
      else setNewsList(data);
    };
    fetchNews();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this news?');
    if (!confirmDelete) return;

    const { error } = await supabase.from('news').delete().eq('id', id);
    if (error) {
      console.error('Delete Error:', error);
      alert('Failed to delete.');
    } else {
      setNewsList((prev) => prev.filter((n) => n.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50 pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-600 mb-6 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-1 text-gray-500 hover:text-green-600">
              <Home size={16} /> Home
            </Link>
            <ChevronRight size={16} />
            <Link href="/admin" className="hover:text-green-600">Admin</Link>
            <ChevronRight size={16} />
            <span className="font-semibold text-black">News</span>
          </nav>

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-black">Manage News</h1>
            <Link
              href="/admin/news/create"
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition"
            >
              <Plus size={20} /> Add New
            </Link>
          </div>

          {/* News Table */}
          <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {newsList.length > 0 ? (
                  newsList.map((news) => (
                    <tr key={news.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-black">{news.title}</td>
                      <td className="px-6 py-4 text-gray-600">{new Date(news.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-gray-600">{news.category || 'Uncategorized'}</td>
                      <td className="px-6 py-4 text-center flex items-center gap-2 justify-center">
                        <Link
                          href={`/admin/news/create?id=${news.id}`}
                          className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
                        >
                          <Edit2 size={18} className="text-blue-600" />
                        </Link>
                        <button
                          onClick={() => handleDelete(news.id)}
                          className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
                        >
                          <Trash size={18} className="text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 py-10">
                      No news found.
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
