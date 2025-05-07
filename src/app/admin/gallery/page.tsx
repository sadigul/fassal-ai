'use client';

import { useState, useEffect } from 'react';
import { Upload, Plus, Loader2, X, Image as ImageIcon, Trash2, Edit, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase/supabase';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function GalleryManagement() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [eventName, setEventName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingEventName, setEditingEventName] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery')
      .select('id, image_url, event_name, created_at')
      .order('created_at', { ascending: false });
    if (error) console.error('❌ Error fetching gallery:', error);
    else setImages(data);
    setLoading(false);
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length || !eventName.trim()) return alert('⚠️ Enter Event Name before uploading.');
    setUploading(true);

    for (let file of files) {
      if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
        alert('❌ Only JPG, PNG, WEBP formats allowed!');
        setUploading(false);
        return;
      }
      const filePath = `${Date.now()}-${file.name}`;
      const { error: storageError } = await supabase.storage.from('gallery').upload(filePath, file);
      if (storageError) {
        console.error('Upload Error:', storageError);
        continue;
      }
      const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(filePath);
      const publicUrl = urlData.publicUrl;
      const { error: insertError } = await supabase.from('gallery').insert({ image_url: publicUrl, event_name: eventName });
      if (insertError) console.error('DB Insert Error:', insertError);
    }

    alert('✅ Images uploaded successfully!');
    setEventName('');
    fetchGallery();
    setUploading(false);
  };

  const handleDelete = async (ids) => {
    if (!confirm('⚠️ Are you sure you want to delete selected image(s) permanently?')) return;
  
    const deletingImages = images.filter(img => ids.includes(img.id));
  
    // Delete images from Storage
    for (let img of deletingImages) {
      const publicUrl = img.image_url;
      const splitUrl = publicUrl.split('/gallery/');
      if (splitUrl.length > 1) {
        const filePath = decodeURIComponent(splitUrl[1]);
        const { error: storageError } = await supabase.storage.from('gallery').remove([filePath]);
        if (storageError) {
          console.error('Storage Delete Error:', storageError);
          alert('❌ Failed to delete file from storage.');
          return;
        }
      }
    }
  
    // Delete rows from Database
    const { error: dbError } = await supabase.from('gallery').delete().in('id', ids);
    if (dbError) {
      console.error('Database Delete Error:', dbError);
      alert('❌ Failed to delete from database.');
      return;
    }
  
    alert('✅ Deleted successfully!');
    fetchGallery();
    setSelectedImages([]);
  };
  
  const startEditing = (id, currentName) => {
    setEditingId(id);
    setEditingEventName(currentName);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingEventName('');
  };

  const saveEdit = async () => {
    if (!editingEventName.trim()) return;
    const { error } = await supabase.from('gallery').update({ event_name: editingEventName }).eq('id', editingId);
    if (error) alert('❌ Error updating event name.');
    else {
      fetchGallery();
      cancelEditing();
    }
  };

  const toggleSelect = (id) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((imgId) => imgId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm mb-6 text-gray-600 gap-1">
            <Home className="text-gray-500" size={18} />
            <button onClick={() => router.push('/')} className="hover:underline">Home</button>
            <span>{'>'}</span>
            <span className="font-bold text-black">Gallery</span>
          </div>

          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-extrabold text-black">Manage Gallery</h1>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Enter Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-black bg-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <label className={`flex items-center gap-2 ${uploading ? 'bg-green-300' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg px-4 py-2 cursor-pointer transition`}>
                {uploading ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                {uploading ? 'Uploading...' : 'Upload Images'}
                <input type="file" accept="image/png,image/jpeg,image/webp" multiple className="hidden" onChange={handleImageUpload} disabled={uploading} />
              </label>
              {selectedImages.length > 0 && (
                <button
                  onClick={() => handleDelete(selectedImages)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Delete Selected ({selectedImages.length})
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="animate-spin text-gray-600" size={36} />
            </div>
          ) : images.length > 0 ? (
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200 bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left text-black">Select</th>
                    <th className="p-4 text-left text-black">Image</th>
                    <th className="p-4 text-left text-black">Event Name</th>
                    <th className="p-4 text-left text-black">Date</th>
                    <th className="p-4 text-left text-black">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {images.map((img) => (
                    <tr key={img.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedImages.includes(img.id)}
                          onChange={() => toggleSelect(img.id)}
                          className="w-5 h-5"
                        />
                      </td>
                      <td className="p-4">
                        <img src={img.image_url} alt={img.event_name} className="w-24 h-16 object-cover rounded" />
                      </td>
                      <td className="p-4 text-black">{img.event_name}</td>
                      <td className="p-4 text-black">{new Date(img.created_at).toLocaleDateString('en-GB')}</td>
                      <td className="p-4 flex gap-2">
                        <button onClick={() => startEditing(img.id, img.event_name)} className="text-blue-600 hover:text-blue-800">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete([img.id])} className="text-red-600 hover:text-red-800">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center text-center py-24 gap-4">
              <ImageIcon size={64} className="text-gray-400" />
              <p className="text-gray-500 text-lg">No images uploaded yet.</p>
            </div>
          )}

          {/* Edit Modal */}
          {editingId && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                <button onClick={cancelEditing} className="absolute top-4 right-4 text-gray-600">
                  <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-4">Edit Event Name</h2>
                <input
                  type="text"
                  value={editingEventName}
                  onChange={(e) => setEditingEventName(e.target.value)}
                  className="border border-gray-300 w-full px-4 py-2 rounded-lg mb-4"
                />
                <button onClick={saveEdit} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg w-full">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
