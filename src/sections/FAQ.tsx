'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const faqs = [
  {
    question: 'Is Fassal.ai free to use?',
    answer:
      'Yes, farmers and buyers can register and use the platform for free. Some premium AI features may have in-app pricing later.',
  },
  {
    question: 'How do I list my crops?',
    answer:
      'After registering, go to your dashboard and tap “List Crops.” Upload your crop details and quality photos to get verified.',
  },
  {
    question: 'Can I sell without GST or business registration?',
    answer:
      'Yes, individual farmers can sell without GST. However, commercial buyers may need documentation for bulk trade.',
  },
  {
    question: 'How does bidding work?',
    answer:
      'Buyers can bid on crops listed by farmers. The farmer can accept or negotiate. The highest verified bid wins the deal.',
  },
  {
    question: 'Are all users verified?',
    answer:
      'Yes, every user must verify their identity and location. This keeps the marketplace secure and credible.',
  },
 
  {
    question: 'Can I use Fassal.ai without internet?',
    answer:
      'A basic internet connection is required to use the app. However, we optimize the platform for low-data and rural zones.',
  },
  {
    question: 'What crops are supported?',
    answer:
      'Fassal.ai supports all major grains, fruits, vegetables, and pulses. You can check the crop list inside the app.',
  },
  {
    question: 'How do I report a fake buyer or seller?',
    answer:
      'You can use the in-app report feature or contact our support team. We investigate every case and take strict action.',
  },
  {
    question: 'Is there customer support available?',
    answer:
      'Yes, you can reach out via chat, WhatsApp, or email. Our team is available 6 days a week to assist you.',
  },
];


export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="FAQ" className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
      <p className="text-green-600 font-semibold uppercase text-sm mb-2">
Frequently Asked Questions          </p>
        <h2 className="text-4xl md:text-5xl  text-black leading-snug mb-12">
          Everything you need to know about
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border-b border-gray-300 pb-6"
              onClick={() => toggle(idx)}
            >
              <div className="flex items-start gap-8 cursor-pointer">
                <span className="text-lg font-bold text-black min-w-[32px]">{String(idx + 1).padStart(2, '0')}</span>
                <div className="flex-1">
                  <h3 className="text-2xl font-medium text-black leading-relaxed">
                    {faq.question}
                  </h3>
                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden mt-4"
                      >
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
