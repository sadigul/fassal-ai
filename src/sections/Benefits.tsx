'use client';

import { motion } from 'framer-motion';
import {
  Gavel,
  BarChart,
  ShieldCheck,
  BadgeCheck,
  ScanLine,
  Bot,
} from 'lucide-react';

export default function Benefits() {
  const features = [
    {
      icon: Gavel,
      title: 'Real-Time Bidding',
      desc: 'Farmers and buyers can bid on crop lots for dynamic, transparent price discovery.',
    },
    {
      icon: BarChart,
      title: 'Market Insights',
      desc: 'Get live mandi rates, demand trends, and crop price analytics — powered by data.',
    },
    {
      icon: BadgeCheck,
      title: 'AI Quality Grading',
      desc: 'Upload crop photos and receive instant AI-based quality classification and pricing.',
    },
    {
      icon: Bot,
      title: 'AI Diagnosis',
      desc: 'Detect crop diseases early through image-based AI scanning and actionable advice.',
    },
    {
      icon: ShieldCheck,
      title: 'Verified Trade Network',
      desc: 'Fassal.ai ensures every buyer and seller is verified for trust and security.',
    },
    {
      icon: ScanLine,
      title: 'Direct Crop Listings',
      desc: 'Skip the agents. Farmers list directly, negotiate instantly, and earn more.',
    },
  ];

  return (
    <section
      id="benefits"
      className="relative bg-white overflow-hidden py-20 px-6 md:px-12"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[url('/images/green-pattern.png')] bg-fixed bg-cover opacity-5" />

      {/* Section Header - Left Aligned */}
      <div className="max-w-7xl mx-auto mb-14">
        <p className="text-green-600 font-semibold uppercase text-sm mb-2">
          Platform Benefits
        </p>
        <h2 className="text-4xl md:text-5xl text-gray-900 mt-2">
          Why Choose Fassal.ai?
        </h2>
        <p className="mt-4 max-w-2xl text-gray-600 text-base">
          The smartest way to trade crops — powered by real-time data, AI, and direct connections between farmers and markets.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map(({ icon: Icon, title, desc }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="mb-6">
              <Icon className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-base leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
