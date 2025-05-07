'use client';

import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#064e3b] text-white font-poppins">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Logo + About */}
        <div>
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <Image src="/images/logo.png" alt="Fassal.ai Logo" width={40} height={40} />
          </Link>
          <p className="text-sm leading-relaxed text-green-100">
            Empowering farmers with technology — bridging the gap between crops and market with intelligent, transparent tools.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              ['Home', '/'],
              ['Our Story', '/about'],
              ['Team', '/team'],
              ['Articles', '/articles'],
              ['News', '/news'],
              ['FAQs', '/faq'],
              ['Mandi Rates', '/mandi-rates'],
              ['Contact Us', '/contact'],
            ].map(([text, href]) => (
              <li key={text}>
                <Link href={href} className="hover:text-green-300 transition-colors">{text}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Connect With Us</h4>
          <div className="flex flex-col space-y-3 text-sm">
            <Link href="#" className="flex items-center gap-2 hover:text-green-300">
              Facebook
            </Link>
            <Link href="https://www.linkedin.com/company/fassal-ai/posts/?feedView=all" className="flex items-center gap-2 hover:text-green-300">
              LinkedIn
            </Link>
            <Link href="#" className="flex items-center gap-2 hover:text-green-300">
               YouTube
            </Link>
            <Link href="https://www.instagram.com/fassal.ai/#" className="flex items-center gap-2 hover:text-green-300">
              Instagram
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
          <p className="text-sm mb-2 text-green-100">
            Email: <a href="mailto:fassal.ai295@gmail.com" className="text-green-300 hover:underline">fassal.ai295@gmail.com</a>
          </p>
          <p className="text-sm mb-2 text-green-100">
            Phone: <a href="https://wa.me/923351345062" className="text-green-300 hover:underline">+92 335 1345062</a>
          </p>
          <p className="text-sm text-green-100">
            Address: <span>National Incubation Center, University of Agriculture, Faisalabad, Pakistan</span>
          </p>
        </div>
      </div>

      <div className="border-t border-green-800 py-4 text-center text-sm text-green-100">
        © {new Date().getFullYear()} <span className="font-medium text-white">Fassal.ai</span> — All rights reserved.
      </div>
    </footer>
  );
}
