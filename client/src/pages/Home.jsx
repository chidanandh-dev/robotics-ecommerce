import { ArrowRight, CheckCircle2, Cpu, GraduationCap, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { getProducts } from '../services/productService.js';

function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getProducts({ featured: true })
      .then((data) => setFeatured(data.products.slice(0, 3)))
      .catch(() => setFeatured([]));
  }, []);

  return (
    <>
      <section className="overflow-hidden bg-slate-950 text-white">
        <div className="container-page grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-sky-400/40 bg-white/10 px-4 py-2 text-sm font-bold text-sky-200">
              Robotics kits + online STEM training
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-6xl">
              Build robots. Learn coding. Launch your STEM journey.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Buy beginner-to-advanced robotics kits and join live online robotics training programs designed for students, hobbyists, and schools.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-6 py-3 font-bold text-white hover:bg-sky-400"
              >
                Shop Robotics Kits <ArrowRight size={19} />
              </Link>
              <Link
                to="/products?category=Online%20Training"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-bold text-white hover:bg-white/10"
              >
                View Training Programs
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[3rem] bg-sky-500 blur-3xl opacity-20" />
            <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
              <div className="relative grid min-h-96 place-items-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-500/20 via-slate-900 to-emerald-500/20 p-8 text-center">
                <div
                  className="absolute inset-0 scale-110 bg-cover bg-center opacity-20"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-sky-700/60 via-slate-950/50 to-emerald-600/40" />
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute left-6 top-8 h-20 w-20 rounded-full border border-sky-300/40" />
                  <div className="absolute bottom-8 right-6 h-24 w-24 rounded-full border border-emerald-300/40" />
                  <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
                </div>
                <div className="relative z-10">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-sky-300/40 bg-white/10 text-4xl font-black text-sky-200 shadow-lg shadow-sky-500/20">
                    B
                  </div>
                  <h2 className="text-2xl font-black">Smart Robotics Learning Kit</h2>
                  <p className="mt-3 text-slate-300">Arduino, sensors, motors, AI modules, lessons, and projects included.</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-3xl border border-white/20 bg-white/10 px-3 py-3 text-sm text-slate-100 shadow-lg shadow-sky-500/10 transition hover:-translate-y-1 hover:bg-sky-500/20 hover:text-white">
                      <span className="block text-2xl">🤖</span>
                      Build & Play
                    </div>
                    <div className="rounded-3xl border border-white/20 bg-white/10 px-3 py-3 text-sm text-slate-100 shadow-lg shadow-cyan-500/10 transition hover:-translate-y-1 hover:bg-cyan-500/20 hover:text-white">
                      <span className="block text-2xl">🎮</span>
                      Fun Projects
                    </div>
                    <div className="rounded-3xl border border-white/20 bg-white/10 px-3 py-3 text-sm text-slate-100 shadow-lg shadow-emerald-500/10 transition hover:-translate-y-1 hover:bg-emerald-500/20 hover:text-white">
                      <span className="block text-2xl">🏆</span>
                      Earn Badges
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container-page mb-6 overflow-hidden rounded-[2rem] border border-sky-200 bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500 p-4 shadow-[0_20px_60px_-20px_rgba(14,165,233,0.45)] md:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 text-white">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-100">Limited Offer</p>
              <h3 className="mt-2 text-3xl font-black sm:text-4xl">Build smarter. Buy faster. Save 50% today.</h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-sky-50 sm:text-base">Customers love the thrill of a limited-time deal — grab your robotics kit now before this offer disappears.</p>
              <Link
                to="/products"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-sky-700 transition hover:scale-105 hover:bg-slate-950 hover:text-white"
              >
                Claim the Offer <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative flex items-center justify-center rounded-[1.8rem] border border-white/40 bg-white/20 p-4 shadow-inner backdrop-blur-sm">
              <div className="absolute inset-0 animate-pulse rounded-[1.8rem] bg-white/10" />
              <div className="relative grid h-28 w-28 place-items-center rounded-full border-4 border-white bg-white text-3xl font-black text-sky-700 shadow-lg">
                50%
              </div>
            </div>
          </div>
        </div>
        <div className="container-page grid gap-4 md:grid-cols-4">
          {[
            { icon: Truck, title: 'Fast Delivery', text: 'Ship kits across India.' },
            { icon: GraduationCap, title: 'Live Training', text: 'Hands-on online classes.' },
            { icon: Cpu, title: 'Project Based', text: 'Build real robotics projects.' },
            { icon: ShieldCheck, title: 'Support', text: 'Guidance after purchase.' },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 p-5">
              <item.icon className="mb-4 text-sky-600" />
              <h3 className="font-black text-slate-950">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-600">Featured Products</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">Popular robotics kits and courses</h2>
          </div>
          <Link to="/products" className="inline-flex items-center gap-2 font-bold text-sky-700 hover:gap-3">
            View all products <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="gradient-card grid gap-8 rounded-[2rem] border border-slate-200 p-8 shadow-sm md:grid-cols-2 md:p-12">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-600">Training Program</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Online robotics classes for schools and students</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Learn electronics, Arduino, sensors, motor control, IoT, AI robotics, and project building with structured online sessions.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-bold text-white hover:bg-sky-700"
            >
              Enquire for batches <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid gap-3">
            {['Beginner friendly curriculum', 'Live doubt solving', 'Certificate after completion', 'School bulk program available'].map((point) => (
              <p key={point} className="flex items-center gap-3 rounded-2xl bg-white p-4 font-semibold text-slate-700 shadow-sm">
                <CheckCircle2 className="text-emerald-500" /> {point}
              </p>
            ))}
          </div>
        </div>
      </section>
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/917907354117"
          target="_blank"
          rel="noreferrer"
          className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-green-500/60" />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-xl text-white">
            <MessageCircle size={24} />
          </span>
          <span className="pointer-events-none absolute -right-1 top-1 hidden rounded-full bg-white px-2 py-1 text-[10px] font-black uppercase text-green-700 sm:block">
            Chat
          </span>
        </a>
      </div>
    </>
  );
}

export default Home;
