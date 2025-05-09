'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdminLogin(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@fassal.ai' && password === 'password123') {
      router.push('/admin/dashboard');
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-sans ${poppins.variable} ${
        scrolled ? 'bg-white/70 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Fassal Logo" width={50} height={50} />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-gray-800 font-medium">
          <Link href="/" className="hover:text-green-600 transition">Home</Link>
          <Link href="/team" className="hover:text-green-600 transition">Our Story</Link>
          <button onClick={() => setShowComingSoon(true)} className="hover:text-green-600 transition">Market Insights</button>
          <Link href="/news" className="hover:text-green-600 transition">News</Link>
          <Link href="/articles" className="hover:text-green-600 transition">Articles</Link>
          <Link href="#FAQ" className="hover:text-green-600 transition">FAQs</Link>
        </nav>

        {/* Contact Button */}
        <div className="hidden md:flex">
          <Link
            href="#contact"
            className="ml-6 px-4 py-2 border border-black text-black rounded-full hover:bg-black hover:text-white transition"
          >
            Contact Us
          </Link>
        </div>

        {/* Hamburger */}
        <button className="md:hidden text-gray-800" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-6 text-lg text-gray-800 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" onClick={() => setIsMobileOpen(false)}>Home</Link>
            <Link href="/team" onClick={() => setIsMobileOpen(false)}>Our Story</Link>
            <button
              onClick={() => {
                setShowComingSoon(true);
                setIsMobileOpen(false);
              }}
            >
              Market Insights
            </button>
            <Link href="/news" onClick={() => setIsMobileOpen(false)}>News</Link>
            <Link href="/articles" onClick={() => setIsMobileOpen(false)}>Articles</Link>
            <Link href="#FAQ" onClick={() => setIsMobileOpen(false)}>FAQs</Link>
            <Link
              href="#contact"
              className="mt-6 px-4 py-2 border border-black text-black rounded-full hover:bg-black hover:text-white transition"
              onClick={() => setIsMobileOpen(false)}
            >
              Contact Us
            </Link>
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsMobileOpen(false)}
            >
              <X size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminLogin && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-xl"
            >
              <h2 className="text-3xl font-extrabold mb-8 text-center text-black">Admin Login</h2>
              <form onSubmit={handleAdminLogin} className="space-y-6">
                <div>
                  <label htmlFor="admin-email" className="block mb-2 text-sm font-semibold text-black">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      id="admin-email"
                      type="email"
                      className="w-full border rounded-full pl-10 pr-4 py-3 focus:outline-none focus:border-black text-black"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="admin-password" className="block mb-2 text-sm font-semibold text-black">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      id="admin-password"
                      type="password"
                      className="w-full border rounded-full pl-10 pr-4 py-3 focus:outline-none focus:border-black text-black"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition text-lg font-semibold">Login</button>
                <button type="button" onClick={() => setShowAdminLogin(false)} className="w-full mt-4 text-center text-sm text-gray-500 hover:text-gray-700">Cancel</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl text-center"
            >
              <h2 className="text-2xl font-bold text-black mb-4">🚧 Coming Soon</h2>
              <p className="text-gray-700 mb-6">This feature is under development. Stay tuned!</p>
              <button
                onClick={() => setShowComingSoon(false)}
                className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
