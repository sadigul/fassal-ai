'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AppDownload() {
  return (
    <section className="bg-gradient-to-r from-green-100 via-white to-green-50 py-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
        {/* Left Side - Text + Buttons */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center lg:text-left max-w-xl"
        >
          <p className="text-green-700 font-semibold uppercase text-sm tracking-wider mb-3">
            Download the App
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Start Trading Smarter
          </h2>
          <p className="text-gray-700 text-base md:text-lg mb-8">
            Access mandi rates, AI tools, crop listings, and real-time deals — all in one seamless app built for farmers and buyers.
          </p>

          <div className="flex justify-center lg:justify-start gap-5">
            <Link href="#" target="_blank">
              <Image
                src="/images/playstore.png"
                alt="Get it on Google Play"
                width={160}
                height={80}
                className="hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <Link href="#" target="_blank">
              <Image
                src="/images/appstore.png"
                alt="Download on the App Store"
                width={160}
                height={30}
                className="hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>
        </motion.div>

        {/* Right Side - App Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full max-w-sm mx-auto"
        >
          <Image
            src="/images/app.png"
            alt="Fassal App Preview"
            width={600}
            height={600}
            className="w-full  h-auto drop-shadow-xl rounded-3xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
