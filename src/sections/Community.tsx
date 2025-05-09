'use client';

import { Users, Leaf, ShoppingCart, MessageCircle } from 'lucide-react';

export default function JoinCommunity() {
  return (
    <section className="relative bg-gradient-to-br from-green-50 via-white to-green-100 py-24 px-6 text-center overflow-hidden font-poppins">
      {/* Background floating icons */}
      <Users className="absolute top-10 left-1/4 w-14 h-14 text-green-300 animate-[float_6s_ease-in-out_infinite]" />
      <Leaf className="absolute bottom-20 left-1/3 w-14 h-14 text-green-200 animate-[float_7s_ease-in-out_infinite]" />
      <ShoppingCart className="absolute top-20 right-1/3 w-14 h-14 text-green-200 animate-[float_5s_ease-in-out_infinite]" />
      <MessageCircle className="absolute bottom-10 right-1/4 w-14 h-14 text-green-300 animate-[float_6s_ease-in-out_infinite]" />

      <div className="max-w-2xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Join Our Thriving Community
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Farmers, buyers, and agri-innovators connect on WhatsApp to share insights, bids, and grow together.
        </p>
        <a
          href="https://chat.whatsapp.com/Gq4C9ZkmTtVJtWEaiiRmeu"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition border border-green-700 shadow-md"
        >
          Join Our WhatsApp Community
        </a>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}
