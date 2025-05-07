'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPlay,
  FaWhatsapp,
} from 'react-icons/fa';

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center bg-white text-gray-900 px-4 sm:px-6 lg:px-12 overflow-hidden">
      
      {/* Center Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-4xl w-full pt-20 mb-50"
      >
        <p className="text-lg md:text-xl text-green-700 font-semibold mb-4">
          Smart Crop Agri-Marketplace
        </p>
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 drop-shadow-md">
          From Farm to Market
          <br />
          with Intelligence
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-700 font-medium text-base sm:text-lg">
          Farmers get better prices. Buyers get fresher deals. Fassal.ai removes the middlemen and puts control in your hands.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="#"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-sm font-medium transition"
          >
            Get the App
          </Link>
          <Link
            href="#benefits"
            className="border border-gray-600 text-gray-800 hover:bg-gray-900 hover:text-white px-6 py-3 rounded-full text-sm font-medium transition"
          >
            Explore More
          </Link>
        </div>
      </motion.div>

      {/* Watch Button - Bottom Left
      <button
        onClick={() => setShowVideo(true)}
        className="absolute bottom-6 left-4 sm:left-6 z-20 flex items-center gap-3 text-gray-800 hover:opacity-90 transition"
      >
        <div className="border border-gray-800 rounded-full p-3">
          <FaPlay className="text-gray-800 text-sm" />
        </div>
        <div className="text-sm leading-tight">
          <span className="font-semibold block">Watch Now</span>
          <span className="text-xs">How it Works</span>
        </div>
      </button> */}

<div className="fixed right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
  <Link
    href="https://www.linkedin.com/company/fassal-ai/posts/?feedView=all"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="bg-gray-800 p-2 rounded-full hover:bg-green-600 transition group">
      <FaLinkedinIn className="text-white group-hover:text-white" />
    </div>
  </Link>
  <Link
    href="https://www.facebook.com/p/fassalai-100069182164536/?locale=en_US
"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="bg-gray-800 p-2 rounded-full hover:bg-green-600 transition group">
      <FaFacebookF className="text-white group-hover:text-white" />
    </div>
  </Link>
  <Link
    href="https://www.instagram.com/fassal.ai/reel/DAnrPpkiSDl/?hl=en"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="bg-gray-800 p-2 rounded-full hover:bg-green-600 transition group">
      <FaInstagram className="text-white group-hover:text-white" />
    </div>
  </Link>
  <Link href="https://www.youtube.com/@fassal_ai" target="_blank" rel="noopener noreferrer">
    <div className="bg-gray-800 p-2 rounded-full hover:bg-green-600 transition group">
      <FaYoutube className="text-white group-hover:text-white" />
    </div>
  </Link>
  <Link href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer">
    <div className="bg-gray-800 p-2 rounded-full hover:bg-green-600 transition group">
      <FaWhatsapp className="text-white group-hover:text-white" />
    </div>
  </Link>
</div>

      {/* Bottom Image */}
      <div className="absolute bottom-0 left-0 w-full h-full  overflow-hidden z-0">
        <Image
          src="/images/bk.png"
          alt="Green Fields"
          layout="fill"
          // objectFit="cover"
          objectPosition="bottom"
          priority
        />
      </div>

      {/* YouTube Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="relative bg-white rounded-lg overflow-hidden max-w-3xl w-full aspect-video shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/ckHZJvRJArQ?autoplay=1"
              title="Fassal.ai Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 bg-black text-white rounded-full px-3 py-1 text-sm hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
