'use client';

import Link from 'next/link';
import { ImageIcon, PlusCircle, Settings } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col  mb-50">
      <Navbar />

      <main className="flex-1 bg-gray-50 pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-12 text-center text-black">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* News Management Card */}
            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col gap-6 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Settings className="text-blue-600" size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">News Management</h2>
                  <p className="text-gray-600 text-sm">Add and manage news articles about agri-developments</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/admin/news" className="flex-1 border border-blue-600 text-blue-600 rounded-full py-2 px-4 text-center font-medium hover:bg-blue-600 hover:text-white transition">
                  Manage Content
                </Link>
                <Link href="/admin/news/create" className="flex-1 bg-blue-600 text-white rounded-full py-2 px-4 text-center font-medium hover:bg-blue-700 transition">
                  <PlusCircle size={18} className="inline mr-1" /> Create New
                </Link>
              </div>
            </div>

            {/* Articles Management Card */}
            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col gap-6 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Settings className="text-purple-600" size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">Articles Management</h2>
                  <p className="text-gray-600 text-sm">Create and edit in-depth articles about agri-topics</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/admin/articles" className="flex-1 border border-purple-600 text-purple-600 rounded-full py-2 px-4 text-center font-medium hover:bg-purple-600 hover:text-white transition">
                  Manage Content
                </Link>
                <Link href="/admin/articles/create" className="flex-1 bg-purple-600 text-white rounded-full py-2 px-4 text-center font-medium hover:bg-purple-700 transition">
                  <PlusCircle size={18} className="inline mr-1" /> Create New
                </Link>
              </div>
            </div>
                    {/* Gallery Management Card */}
                    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col gap-6 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <ImageIcon className="text-green-600" size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">Gallery Management</h2>
                  <p className="text-gray-600 text-sm">Upload and manage gallery images for your platform</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/admin/gallery" className="flex-1 border border-green-600 text-green-600 rounded-full py-2 px-4 text-center font-medium hover:bg-green-600 hover:text-white transition">
                  Manage Gallery
                </Link>
                <Link href="/admin/gallery/upload" className="flex-1 bg-green-600 text-white rounded-full py-2 px-4 text-center font-medium hover:bg-green-700 transition">
                  <PlusCircle size={18} className="inline mr-1" /> Upload New
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}