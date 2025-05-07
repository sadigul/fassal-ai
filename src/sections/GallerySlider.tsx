'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function GallerySlider() {
  const [eventGroups, setEventGroups] = useState<Record<string, any[]>>({});
  const [currentEvent, setCurrentEvent] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const { supabase } = await import('@/supabase/supabase');
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        const grouped = data.reduce((acc, item) => {
          if (!acc[item.event_name]) acc[item.event_name] = [];
          acc[item.event_name].push(item);
          return acc;
        }, {} as Record<string, any[]>);

        setEventGroups(grouped);
        setCurrentEvent(Object.keys(grouped)[0]); // Latest event
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (eventGroups[currentEvent]) {
        setCurrentIndex((prev) => (prev + 1) % eventGroups[currentEvent].length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [eventGroups, currentEvent]);

  const handlePrev = () => {
    const images = eventGroups[currentEvent] || [];
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    const images = eventGroups[currentEvent] || [];
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (!currentEvent || !eventGroups[currentEvent]?.length)
    return <div className="text-center py-12 text-gray-500">No gallery images found.</div>;

  const currentImg = eventGroups[currentEvent][currentIndex];
  const formattedDate = new Date(currentImg.created_at).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });

  return (
    <section id="gallery" className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="mb-10 text-left">
          <p className="text-green-600 font-semibold uppercase text-sm tracking-wide">Events</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl  text-gray-900 leading-snug mt-2">
            What’s Happening Inside Fassal.ai
          </h2>
        </div>

        {/* Main Slider */}
        <div className="relative rounded-2xl shadow-lg overflow-hidden mb-10 max-w-5xl mx-auto">
          <div className="bg-black flex justify-center items-center h-[400px] sm:h-[500px] md:h-[600px]">
            <img
              src={currentImg.image_url}
              alt={currentImg.event_name}
              className="max-h-full max-w-full object-contain transition-all duration-500"
            />
          </div>

          {/* Date Badge */}
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded text-center shadow">
            <div className="text-lg font-bold text-gray-800">{formattedDate.split(' ')[0]}</div>
            <div className="text-xs text-green-700 font-semibold uppercase">
              {formattedDate.split(' ')[1]}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70"
          >
            <ArrowLeft size={22} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70"
          >
            <ArrowRight size={22} />
          </button>

          {/* Event Name Overlay */}
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white py-4 px-6 text-center">
            <p className="text-lg font-semibold">{currentImg.event_name}</p>
          </div>
        </div>

        {/* Thumbnails Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {Object.entries(eventGroups).map(([eventName, images]) => {
            const thumb = images[0];
            return (
              <div
                key={eventName}
                onClick={() => {
                  setCurrentEvent(eventName);
                  setCurrentIndex(0);
                }}
                className={`cursor-pointer rounded-xl overflow-hidden border shadow hover:shadow-md transition-all ${
                  currentEvent === eventName ? 'ring-2 ring-green-600' : ''
                }`}
              >
                <img
                  src={thumb.image_url}
                  alt={eventName}
                  className="w-full h-36 object-cover"
                />
                <div className="bg-gray-100 text-center py-2 px-2">
                  <p className="text-sm font-medium text-gray-800 truncate">{eventName}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
