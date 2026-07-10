import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import { sendContactMessage } from '../services/contactService.js';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const text = `*New Contact Enquiry*
*Name:* ${form.name}
*Email:* ${form.email}
*Phone:* ${form.phone}
*Subject:* ${form.subject}
*Message:* ${form.message}`;

    const whatsappUrl = `https://wa.me/917907354117?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear the form after sending
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to us about robotics kits and training"
        description="Need a school program, bulk robotics kit order, or online class batch? Send a message."
      />

      <section className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_420px]">
        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">Subject</label>
              <input name="subject" value={form.subject} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100" />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm font-bold text-slate-700">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="6"
              required
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />
          </div>

          {status.message && (
            <div className={`mt-4 rounded-2xl p-3 text-sm font-semibold ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
              {status.message}
            </div>
          )}

          <button disabled={loading} className="mt-6 rounded-full bg-sky-600 px-6 py-3 font-black text-white hover:bg-sky-700 disabled:bg-slate-300">
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <aside className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-sm">
          <h2 className="text-2xl font-black">Build a Bot</h2>
          <p className="mt-3 leading-7 text-slate-300">We help students and schools learn robotics through kits, live classes, and project-based programs.</p>
          <div className="mt-8 space-y-4">
            <p className="flex items-center gap-3"><Mail className="text-sky-400" /> aliashif36875@gmail.com</p>
            <p className="flex items-center gap-3"><Phone className="text-sky-400" /> +91 7907354117</p>
            <p className="flex items-center gap-3"><MapPin className="text-sky-400" /> India</p>
          </div>
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-5">
            <h3 className="font-black">For schools</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">Ask about robotics labs, STEM workshops, annual training plans, and bulk kit pricing.</p>
          </div>
        </aside>
      </section>
    </>
  );
}

export default Contact;
