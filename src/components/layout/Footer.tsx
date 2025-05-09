'use client';

import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-emerald-900 to-green-900 text-white font-poppins">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

        {/* Logo and About */}
        <div>
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <Image src="/images/logo.png" alt="Fassal.ai Logo" width={40} height={40} />
            <span className="text-xl font-bold">Fassal.ai</span>
          </Link>
          <p className="text-sm text-green-100">
            Empowering farmers with AI — bridging the gap between farms and markets using smart, transparent tools.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold mb-4 border-b border-green-600 pb-1">Quick Links</h4>
          <ul className="space-y-2 text-sm text-green-100">
            {[ ['Home', '/'], ['Our Story', '/about'], ['Team', '/team'], ['Articles', '/articles'], ['News', '/news'], ['FAQs', '/faq'], ['Mandi Rates', '/mandi-rates'], ['Contact Us', '/contact'] ].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4 border-b border-green-600 pb-1">Follow Us</h4>
          <ul className="space-y-3 text-sm text-green-100">
            <li><Link href="#" className="flex items-center gap-2 hover:text-white"><Facebook size={16} /> Facebook</Link></li>
            <li><Link href="https://www.linkedin.com/company/fassal-ai/posts/?feedView=all" className="flex items-center gap-2 hover:text-white"><Linkedin size={16} /> LinkedIn</Link></li>
            <li><Link href="#" className="flex items-center gap-2 hover:text-white"><Youtube size={16} /> YouTube</Link></li>
            <li><Link href="https://www.instagram.com/fassal.ai/#" className="flex items-center gap-2 hover:text-white"><Instagram size={16} /> Instagram</Link></li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h4 className="text-lg font-semibold mb-4 border-b border-green-600 pb-1">Contact</h4>
          <p className="text-sm text-green-100 mb-2">
            Email: <a href="mailto:fassal.ai295@gmail.com" className="text-green-300 hover:underline">fassal.ai295@gmail.com</a>
          </p>
          <p className="text-sm text-green-100 mb-2">
            Phone: <a href="https://wa.me/923351345062" className="text-green-300 hover:underline">+92 335 1345062</a>
          </p>
          <p className="text-sm text-green-100">
            Address: National Incubation Center, University of Agriculture, Faisalabad
          </p>
        </div>
      </div>

      <div className="border-t border-green-800 py-4 text-center text-sm text-green-100">
        © {new Date().getFullYear()} <span className="font-semibold text-white">Fassal.ai</span> — All rights reserved.
      </div>
    </footer>
  );
}