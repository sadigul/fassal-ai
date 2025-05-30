'use client';
export const dynamic = 'force-dynamic';


import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/supabase/supabase';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { Tag as TagIcon, Image as ImageIcon, Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function CreateOrEditArticle() {
  const router = useRouter();
  const params = useSearchParams();
  const articleId = params.get('id');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [previewImage, setPreviewImage] = useState<string>('');
  const [localImageFile, setLocalImageFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFeatured, setIsFeatured] = useState(false);

  const categories = [
    'Crops', 'Fruits and Vegetables', 'Grains and Cereals', 'Livestock and Cattle',
    'Poultry and Eggs', 'Dairy Farming', 'AgriTech', 'Supply Chain and Logistics',
    'Organic Farming', 'Agrochemicals (Fertilizers & Pesticides)', 'Climate Change & Sustainability',
    'Water Management & Irrigation', 'Soil Health and Nutrition', 'Agricultural Machinery',
    'Market Trends and Pricing', 'Government Policies and Regulations',
    'Agri Business and Startups', 'Export and International Trade',
    'Farming Innovations', 'Rural Development'
  ];

  useEffect(() => {
    if (articleId) fetchArticle();
  }, [articleId]);

  const fetchArticle = async () => {
    const { data, error } = await supabase.from('articles').select('*').eq('id', articleId).single();
    if (error) {
      console.error('Fetch Error:', error);
      return;
    }
    setTitle(data.title || '');
    setDescription(data.description || '');
    setContent(data.content || '');
    setImageUrl(data.image_url || '');
    setCategory(data.category || '');
    setTags(data.tags || []);
    setPreviewImage(data.image_url || '');
    setIsFeatured(data.is_featured || false);
  };

  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  let finalImageUrl = imageUrl;

  // If a local file is selected, upload it
  if (localImageFile) {
    const filePath = `articles/${Date.now()}-${localImageFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('article-images')
      .upload(filePath, localImageFile, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload Error:', uploadError);
      alert('Image upload failed');
      setLoading(false);
      return;
    }

    const { data: publicUrlData } = supabase
      .storage
      .from('article-images')
      .getPublicUrl(filePath);

    finalImageUrl = publicUrlData.publicUrl;
  }

  const slug = slugify(title);

  const payload = {
    title,
    description,
    content,
    image_url: finalImageUrl,
    tags,
    category,
    is_featured: isFeatured,
    slug
  };

  let result;
  if (articleId) {
    result = await supabase.from('articles').update(payload).eq('id', articleId);
  } else {
    result = await supabase.from('articles').insert([payload]);
  }

  if (result.error) {
    alert(`Failed to ${articleId ? 'update' : 'create'} article ❌`);
    console.error(result.error);
  } else {
    alert(`Article ${articleId ? 'updated' : 'created'} successfully ✅`);
    router.push('/admin/articles');
  }

  setLoading(false);
};


  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => setTags(tags.filter(tag => tag !== tagToRemove));
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && (e.preventDefault(), addTag());
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
          <nav className="text-sm text-gray-600 mb-8 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-1 text-gray-500 hover:text-green-600"><Home size={16} /> Home</Link>
            <ChevronRight size={16} />
            <Link href="/admin" className="hover:text-green-600">Admin</Link>
            <ChevronRight size={16} />
            <Link href="/admin/articles" className="hover:text-green-600 font-semibold text-black">Articles</Link>
            <ChevronRight size={16} />
            <span className="text-green-600 font-semibold">{articleId ? 'Edit' : 'Create'}</span>
          </nav>

          <form onSubmit={handleSubmit} className="space-y-10 bg-white shadow rounded-3xl p-10">
            <div>
              <label className="block mb-2 text-black font-semibold">Title</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black" placeholder="Enter article title" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-2 text-black font-semibold">Short Description</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black" placeholder="Enter short description" value={description} onChange={e => setDescription(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-2 text-black font-semibold">Main Content</label>
              <RichTextEditor id="content" value={content} onChange={e => setContent(e.target.value)} editorClassName="text-black" />
            </div>
            <div>
              <label className="block mb-2 text-black font-semibold">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black" required>
                <option value="">Select a category</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-black font-semibold">Feature Image</label>
              <div className="flex gap-3 mb-4">
                <input type="text" className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-black" placeholder="Paste image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2"> <ImageIcon size={18} /> Upload </button>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageSelect} className="hidden" />
              </div>
              {(previewImage || imageUrl) && <img src={previewImage || imageUrl} alt="Preview" className="rounded-xl max-w-full h-auto shadow" />}
            </div>
            <div>
              <label className="block mb-2 text-black font-semibold">Tags</label>
              <div className="flex gap-2 mb-4">
                <input type="text" onKeyDown={handleTagKeyDown} className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-black" placeholder="Type and press Enter" value={newTag} onChange={e => setNewTag(e.target.value)} />
              </div>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                  <span key={index} className="flex items-center gap-1 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm" onClick={() => removeTag(tag)}>
                    <TagIcon size={14} /> {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-black font-semibold">Feature this article?</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={isFeatured} onChange={() => setIsFeatured(!isFeatured)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-[2px] after:bg-white after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-lg font-bold">
              {loading ? (articleId ? 'Updating...' : 'Publishing...') : (articleId ? 'Update Article' : 'Publish Article')}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
