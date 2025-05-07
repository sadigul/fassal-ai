'use client';

import { useState } from 'react';
import emailjs from 'emailjs-com';

export default function ContactUsSection() {
  const [form, setForm] = useState({ name: '', email: '', purpose: '', message: '' });
  const [focused, setFocused] = useState({ name: false, email: false, purpose: false, message: false });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => setFocused((prev) => ({ ...prev, [field]: true }));
  const handleBlur = (field) => {
    if (!form[field]) setFocused((prev) => ({ ...prev, [field]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
  
    const payload = {
      ...form,
      time: new Date().toLocaleString(),
      title: form.purpose || 'General Inquiry',
    };
  
    try {
      await emailjs.send(
        'service_58qa47v',       // Your Gmail service ID
        'template_on3idaf',      // Your email template ID
        payload,
        'pvVOL5s5MbP-149ay'      // Your public API key
      );
      alert('✅ Message sent!');
      setForm({ name: '', email: '', purpose: '', message: '' });
      setFocused({ name: false, email: false, purpose: false, message: false });
    } catch (error) {
      alert('❌ Failed to send message. Please try again later.');
      console.error('EmailJS Error:', error);
    }
  
    setSending(false);
  };
  

  return (
    <section id="contact" className="relative bg-white overflow-hidden py-20 px-6 md:px-12">
      <div className="flex flex-col md:flex-row items-start justify-between gap-12 max-w-7xl mx-auto">
        <div className="md:w-1/2">
          <p className="text-green-600 font-semibold uppercase text-sm mb-2">Contact Us</p>
          <h2 className="text-4xl md:text-5xl font-bold text-black leading-snug">
            We'd love to hear<br />from you!
          </h2>

          <div className="mt-10 space-y-6">
            <div>
              <h4 className="text-xlg text-black font-semibold">EMAIL ADDRESS</h4>
              <p className="text-gray-700 text-2xl">
                fassal.ai295@gmail.com</p>
            </div>
            <div>
              <h4 className="text-xlg text-black font-semibold">OFFICE LOCATION</h4>
              <p className="text-gray-700 text-2xl mt-2">
                National Incubation Center,  University of Agriculture , Faisalabad
              </p>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 w-full bg-gray-200 rounded-2xl p-8">
          <h3 className="text-2xl text-black  mb-6">Get in Touch</h3>
          <form onSubmit={handleSubmit} className="space-y-8">
            {['name', 'email', 'purpose', 'message'].map((field, idx) => (
              <div key={idx} className="relative">
                <label
                  htmlFor={field}
                  className={`absolute left-0 top-2 text-sm text-gray-500 transition-all duration-300
                    ${focused[field] || form[field] ? '-top-4 text-xs text-green-600' : ''}`}
                >
                  {{
                    name: 'Full Name',
                    email: 'Email Address',
                    purpose: 'Purpose',
                    message: 'Message',
                  }[field]}
                </label>

                {field !== 'message' ? (
                  <input
                    id={field}
                    name={field}
                    type={field === 'email' ? 'email' : 'text'}
                    value={form[field]}
                    onChange={handleChange}
                    onFocus={() => handleFocus(field)}
                    onBlur={() => handleBlur(field)}
                    required
                    className="w-full border-b text-black border-gray-400 bg-transparent outline-none focus:border-green-600 pt-6 pb-2"
                  />
                ) : (
                  <textarea
                    id={field}
                    name={field}
                    rows={5}
                    value={form[field]}
                    onChange={handleChange}
                    onFocus={() => handleFocus(field)}
                    onBlur={() => handleBlur(field)}
                    required
                    className="w-full  text-black border-b border-gray-400 bg-transparent outline-none focus:border-green-600 pt-6 pb-2"
                  ></textarea>
                )}
              </div>
            ))}

            <div>
              <button
                type="submit"
                disabled={sending}
                className="bg-black text-white rounded-full px-6 py-2 hover:bg-gray-800 transition disabled:opacity-50"
              >
                {sending ? 'Sending...' : 'Send a Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
