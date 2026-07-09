import { CreditCard, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { createCheckoutSession } from '../services/paymentService.js';

function Cart() {
  const { items, subtotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const shipping = subtotal > 0 ? 150 : 0;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }

    try {
      const data = await createCheckoutSession(items);
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to start checkout. Please try again.');
    }
  };

  return (
    <>
      <PageHeader eyebrow="Shopping Cart" title="Review your robotics order" description="Update quantities, remove items, and continue to secure checkout." />

      <section className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.length > 0 ? (
            items.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <ShoppingBag className="mx-auto mb-4 text-slate-400" size={48} />
              <h2 className="text-2xl font-black text-slate-950">Your cart is empty</h2>
              <p className="mt-2 text-slate-600">Add a robotics kit or training program to continue.</p>
              <Link
                to="/products"
                className="mt-6 inline-flex rounded-full bg-sky-600 px-6 py-3 font-bold text-white hover:bg-sky-700"
              >
                Browse Products
              </Link>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">Order Summary</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Shipping</span>
              <span className="font-bold">₹{shipping.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <div className="flex justify-between text-lg">
                <span className="font-black text-slate-950">Total</span>
                <span className="font-black text-slate-950">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-black text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <CreditCard size={20} /> Checkout
          </button>

          {items.length > 0 && (
            <button onClick={clearCart} className="mt-3 w-full rounded-full px-6 py-3 font-bold text-rose-600 hover:bg-rose-50">
              Clear cart
            </button>
          )}
        </aside>
      </section>
    </>
  );
}

export default Cart;
