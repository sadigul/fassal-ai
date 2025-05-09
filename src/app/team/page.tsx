'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowDown } from 'lucide-react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-inter' });

export default function TeamPage() {
  const scrollToSection = (id) => {
    if (typeof window !== 'undefined') {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={`bg-white min-h-screen ${inter.variable} font-sans`}>
      <Navbar />

      <main className="pt-36">
        {/* HERO HEADER VISION */}
        <section id="hero" className="relative text-center py-32 px-6 bg-white overflow-hidden">
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.05),transparent)] rounded-full" />
          </div>
          <p className="text-xs uppercase text-gray-500 tracking-widest mb-4">About Us</p>
          <h1 className="text-5xl md:text-6xl  text-black mb-8 leading-tight tracking-tight">
            We are driven by the vision of a <br className="hidden md:block" /> sustainable future
          </h1>
          <button
            onClick={() => scrollToSection('our-story')}
            className="inline-flex items-center gap-2 border border-black text-sm px-5 py-2.5 rounded-full text-black hover:bg-black hover:text-white transition"
          >
            Scroll down <ArrowDown size={16} />
          </button>
        </section>

        {/* OUR STORY SECTION */}
        <section id="our-story" className="max-w-7xl mx-auto mb-32 px-6 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <Image 
                src="/images/Story.jpeg" 
                alt="Our Story Image" 
                width={650} 
                height={450} 
                className="rounded-3xl object-cover shadow-lg"
              />
            </div>
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl text-black mb-6">Our Story</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
  Fassal.ai was born out of real struggles faced by farmers across Pakistan. From long days in the fields to unfair prices at the mandi, we listened to countless stories of frustration and missed opportunities. Many farmers still rely on outdated practices, lack access to reliable data, and are forced to sell their produce through middlemen at throwaway rates. That’s where Fassal.ai stepped in — not just as a tech platform, but as a partner. By combining local knowledge with smart technology, we’re helping farmers take control of their crops, connect directly with buyers, and build a fairer, more transparent agricultural economy.
</p>

            </div>
          </div>
        </section>

        {/* VISION & MISSION - SIDE BY SIDE STYLE */}
        <section className="max-w-7xl mx-auto mb-40 px-6 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <div className="text-left">
              <p className="text-xl uppercase tracking-widest text-gray-500 mb-4">Our Vision</p>
              <p className="text-gray-800 text-3xl leading-relaxed">
                To be the leading agri-intelligence platform that creates equal access to markets for every farmer, demonstrating sustainable livelihoods.
              </p>
            </div>

            <div className="text-left">
              <p className="text-xl uppercase tracking-widest text-gray-500 mb-4">Our Mission</p>
              <p className="text-gray-800 text-3xl leading-relaxed">
                To revolutionize agriculture through smart tools, direct market access, and an inclusive ecosystem where farmers and buyers thrive together.
              </p>
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="max-w-7xl mx-auto px-6 mb-40 animate-fade-in-up">
          <h2 className="text-4xl  text-black text-center mb-20">Meet Our Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                name: 'Saad Hassan',
                title: 'Founder & CEO',
                image: '/images/Logo.png',
                link: 'https://www.linkedin.com/in/saadhassan295/',
                description: 'Passionate about agri-tech innovation using AI and smart systems.',
              },
              {
                name: 'Dr. Sania Sarfraz',
                title: 'Co-Founder & CMO',
                image: '/images/Sania.png',
                link: 'https://www.linkedin.com/in/dr-sania-sarfraz-raja-14d5m1989/',
                description: 'Expert in agricultural research and sustainable farming practices.',
              },
              {
                name: 'Saba Akram',
                title: 'Co-Founder & CTO',
                image: '/images/Saba.jpg',
                link: 'https://www.linkedin.com/in/saba-akram-97b349172/',
                description: 'Focused on farmer engagement and digital community building.',
              },
            ].map((member, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-white p-8 rounded-3xl shadow-lg  h-full"
              >
              <div className="w-[180px] h-[180px] rounded-full overflow-hidden shadow mb-6">
  <Image
    src={member.image}
    alt={member.name}
    width={180}
    height={180}
    className="object-cover w-full h-full"
  />
</div>

                <h3 className="text-2xl font-bold text-black mb-1 text-center">{member.name}</h3>
                <p className="text-green-600 font-medium mb-4 text-center">{member.title}</p>
                <p className="text-gray-600 text-center text-base mb-6">{member.description}</p>
                <Link
                  href={member.link}
                  target="_blank"
                  className="inline-block bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition"
                >
                  View LinkedIn
                </Link>
              </div>
            ))}
          </div>
        </section>

        
      </main>

      <Footer />
    </div>
  );
}