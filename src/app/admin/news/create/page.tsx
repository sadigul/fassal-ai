'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/supabase/supabase';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { BadgePlus, Home, ChevronRight, Image as ImageIcon, Tag as TagIcon } from 'lucide-react';
import Link from 'next/link';

export default function CreateOrEditNews() {
  const router = useRouter();
  const params = useSearchParams();
  const newsId = params.get('id');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [localImageFile, setLocalImageFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'Agriculture News',
    'Market Updates',
    'Weather News',
    'Technology & Innovation',
    'Policy & Regulations',
    'Agri Business',
    'Farming Techniques',
    'Sustainability & Climate',
    'Supply Chain',
    'Livestock & Poultry'
  ];

  useEffect(() => {
    if (newsId) {
      fetchNews();
    }
  }, [newsId]);

  const fetchNews = async () => {
    const { data, error } = await supabase.from('news').select('*').eq('id', newsId).single();
    if (error) console.error('Fetch Error:', error);
    else {
      setTitle(data.title || '');
      setDescription(data.description || '');
      setContent(data.content || '');
      setImageUrl(data.image_url || '');
      setCategory(data.category || '');
      setTags(data.tags || []);
      setPreviewImage(data.image_url || '');
      setIsFeatured(data.is_featured || false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let finalImageUrl = imageUrl;

    if (localImageFile) {
      const { data, error } = await supabase.storage
        .from('news-images')
        .upload(`news/${Date.now()}-${localImageFile.name}`, localImageFile, { cacheControl: '3600', upsert: false });

      if (error) {
        console.error('Upload Error:', error);
        setLoading(false);
        return;
      }

      const { publicUrl } = supabase.storage.from('news-images').getPublicUrl(data.path);
      finalImageUrl = publicUrl;
    }

    const slug = generateSlug(title);

    if (newsId) {
      const { error } = await supabase.from('news')
        .update({ title, slug, description, content, image_url: finalImageUrl, tags, category, is_featured: isFeatured })
        .eq('id', newsId);

      if (error) alert('Failed to update ❌');
      else {
        alert('News updated successfully ✅');
        router.push('/admin/news');
      }
    } else {
      const { error } = await supabase.from('news')
        .insert([{ title, slug, description, content, image_url: finalImageUrl, tags, category, is_featured: isFeatured }]);

      if (error) alert('Failed to create ❌');
      else {
        alert('News created successfully ✅');
        router.push('/admin/news');
      }
    }

    setLoading(false);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50 pt-28 pb-16 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-600 mb-8 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-1 text-gray-500 hover:text-green-600">
              <Home size={16} /> Home
            </Link>
            <ChevronRight size={16} />
            <Link href="/admin" className="hover:text-green-600">Admin</Link>
            <ChevronRight size={16} />
            <Link href="/admin/news" className="hover:text-green-600 font-semibold text-black">News</Link>
            <ChevronRight size={16} />
            <span className="text-green-600 font-semibold">{newsId ? 'Edit' : 'Create'}</span>
          </nav>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-10 bg-white shadow rounded-3xl p-10">

            {/* Title */}
            <div>
              <label className="block mb-2 text-black font-semibold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-green-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 text-black font-semibold">Short Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-green-500"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block mb-2 text-black font-semibold">Main Content</label>
              <RichTextEditor id="content" value={content} onChange={(e) => setContent(e.target.value)} editorClassName="text-black" />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 text-black font-semibold">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-green-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Image */}
            <div>
              <label className="block mb-2 text-black font-semibold">Feature Image</label>
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Paste image URL"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-green-500"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 transition"
                >
                  <ImageIcon size={18} /> Upload
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>
              {(previewImage || imageUrl) && (
                <div className="mt-6">
                  <img src={previewImage || imageUrl} alt="Preview" className="rounded-xl max-w-full h-auto shadow" />
                </div>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block mb-2 text-black font-semibold">Tags</label>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Type and press Enter"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    onClick={() => removeTag(tag)}
                    className="flex items-center gap-1 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm cursor-pointer hover:bg-green-200"
                  >
                    <TagIcon size={14} /> {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured toggle */}
            <div className="flex items-center gap-4">
              <label className="text-black font-semibold">Feature this news?</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={() => setIsFeatured(!isFeatured)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-checked:bg-green-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-lg font-bold"
            >
              {loading ? (newsId ? 'Updating...' : 'Publishing...') : (newsId ? 'Update News' : 'Publish News')}
            </button>

          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
}
