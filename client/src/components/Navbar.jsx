import { LayoutDashboard, Menu, ShoppingCart, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import logo from '../logo.png.png';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Contact', path: '/contact' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const linkClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-medium ${
      isActive ? 'bg-sky-100 text-sky-700' : 'text-slate-700 hover:bg-slate-100 hover:text-sky-700'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 font-bold text-slate-950">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-500 to-emerald-500 text-lg font-black text-white shadow-lg shadow-sky-500/20">
            B
          </div>
          <span className="leading-tight">
            Build a Bot
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          {user?.role === 'admin' && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/cart" className="relative rounded-full p-2 text-slate-700 hover:bg-slate-100 hover:text-sky-700">
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-emerald-500 px-1 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-sm text-slate-600 lg:inline">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-500 hover:text-sky-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
            >
              <UserRound size={18} /> Login
            </Link>
          )}
        </div>

        <button
          onClick={() => setIsOpen((value) => !value)}
          className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="container-page flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={linkClass} onClick={() => setIsOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            {user?.role === 'admin' && (
              <NavLink to="/admin" className={linkClass} onClick={() => setIsOpen(false)}>
                <span className="inline-flex items-center gap-2">
                  <LayoutDashboard size={18} /> Admin
                </span>
              </NavLink>
            )}
            <NavLink to="/cart" className={linkClass} onClick={() => setIsOpen(false)}>
              Cart ({itemCount})
            </NavLink>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="rounded-xl bg-slate-900 px-4 py-2 text-left text-sm font-semibold text-white">
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
