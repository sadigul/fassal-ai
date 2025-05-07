'use client';
// app/layout.tsx or _app.tsx
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

// In your <html> tag
<html lang="en" className={poppins.variable}></html>
export default function Partners() {
  const logos = [
    { src: 'https://www.gstatic.com/devrel-devsite/prod/v0e0f589edd85502a40d78d7d0825db8ea5ef3b99ab4070381ee86977c9168730/cloud/images/cloud-logo.svg', alt: 'Google Cloud' },
    { src: 'https://pitb.gov.pk/sites/pitb.gov.pk/themes/bootstrap/logo.png', alt: 'PITB' },
    { src: 'https://www.nicf.pk/wp-content/uploads/2023/06/ignite.png', alt: 'Ignite' },
    { src: 'https://nicf.pk/wp-content/uploads/2022/08/logo.png', alt: 'NICF' },
    { src: 'https://plan9.pitb.gov.pk/sites/plan9.pitb.gov.pk/themes/bootstrap/logo.png', alt: 'Plan 9' },
  ];

  return (
    <section className="w-full bg-white py-10 overflow-hidden">
 


      <div className="relative overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {[...logos, ...logos].map((logo, idx) => (
            <div key={idx} className="flex-shrink-0 flex justify-center items-center min-w-[180px] max-w-[220px]">
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-full h-[90px] object-contain grayscale hover:grayscale-0 transition duration-300 ease-in-out"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
