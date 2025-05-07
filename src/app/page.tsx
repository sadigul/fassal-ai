'use client';

import { useEffect } from 'react';
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AppDownload from "@/sections/AppDownload";
import Benefits from "@/sections/Benefits";
import ContactUs from "@/sections/ContactUs";
import FAQ from "@/sections/FAQ";
import FeaturedArticles from "@/sections/FeatureArticles";
import FeaturedNews from "@/sections/FeatureNews";
import Hero from "@/sections/Hero";
import Partners from "@/sections/Partners";
import dynamic from 'next/dynamic';

const GallerySlider = dynamic(() => import('@/sections/GallerySlider'), {
  ssr: false,
});

export default function Home() {
  // ✅ scroll to hash section when landing with /#something
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 200); // allow rendering time
      }
    }
  }, []);

  return (
    <main className="flex flex-col">
      <Navbar />
      <Hero />
      <Partners />
      <Benefits />
      <AppDownload />
      {/* <section id="gallery" className="scroll-mt-24">
        <GallerySlider />
      </section> */}
      <FeaturedNews />
      <FeaturedArticles />
      <FAQ />
      <ContactUs />
      <Footer />
    </main>
  );
}
