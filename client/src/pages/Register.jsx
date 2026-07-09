import { Bot } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-page grid min-h-[calc(100vh-8rem)] place-items-center py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500 text-white">
            <Bot size={28} />
          </div>
          <h1 className="text-3xl font-black text-slate-950">Create account</h1>
          <p className="mt-2 text-slate-600">Start your robotics learning journey.</p>
          <p className="mt-3 text-sm font-semibold text-sky-700">Need help? Call us: +91 7907354117</p>
        </div>

        {error && <div className="mb-4 rounded-2xl bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Password</label>
            <input
              name="password"
              type="password"
              minLength="6"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              placeholder="Minimum 6 characters"
            />
          </div>
          <button
            disabled={loading}
            className="w-full rounded-full bg-emerald-500 px-6 py-3 font-black text-white hover:bg-emerald-600 disabled:bg-slate-300"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-sky-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
