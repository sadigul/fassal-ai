'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';

export default function AccountDeletionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-6 py-16 mt-20">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
            Account or Data Deletion Request
          </h1>

          <p className="text-lg mb-4">
            We take your privacy seriously. If you wish to delete your account and associated data from Fassal.ai App, please send us a request via email.
          </p>

          <p className="text-base font-semibold mb-4">
            Email us at:{' '}
            <a href="mailto:info@fassalai.com" className="text-green-700 underline">
fassalai295@gmail.com            </a>
          </p>

          <p className="mb-2 font-medium">Please include the following details in your email so we can verify your request:</p>
          <ul className="list-disc list-inside space-y-1 text-base text-gray-700 mb-6">
            <li>Your full name</li>
            <li>Your registered email address</li>
            <li>Your phone number</li>
            <li>Your CNIC (used for verification)</li>
            <li>A clear statement requesting account and data deletion</li>
          </ul>

          <p className="text-base text-gray-700">
            Once we receive your request, we will review and process it within <strong>7–14 business days</strong>. If needed, our support team may contact you for verification.
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
