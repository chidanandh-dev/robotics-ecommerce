import { Bot, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="container-page grid gap-8 py-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-4 flex items-center gap-2 font-bold">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-sky-500">
              <Bot />
            </span>
            Build a Bot
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-300">
            Robotics kits, STEM learning hardware, and online training programs for students, makers, and schools.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Explore</h3>
          <div className="flex flex-col gap-2 text-sm text-slate-300">
            <Link to="/products" className="hover:text-white">Robotics Kits</Link>
            <Link to="/products?category=Online%20Training" className="hover:text-white">Online Training</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Contact</h3>
          <div className="space-y-2 text-sm text-slate-300">
            <p className="flex items-center gap-2"><Mail size={16} /> aliashif36875@gmail.com</p>
            <p className="flex items-center gap-2"><Phone size={16} /> +91 7907354117</p>
            <p className="flex items-center gap-2"><MapPin size={16} /> India</p>
            <a
              href="https://www.instagram.com/build_a_bots?igsh=MWd4cG9ncW5lY3R3NA=="
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-white/10 text-xs">IG</span> Follow on Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Build a Bot. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
