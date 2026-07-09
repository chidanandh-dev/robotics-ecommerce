import { CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

function CheckoutSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <section className="container-page grid min-h-[calc(100vh-8rem)] place-items-center py-12">
      <div className="max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto mb-4 text-emerald-500" size={64} />
        <h1 className="text-4xl font-black text-slate-950">Payment successful</h1>
        <p className="mt-4 leading-7 text-slate-600">
          Thank you for your robotics order. You will receive confirmation and next steps soon.
        </p>
        <Link to="/products" className="mt-6 inline-flex rounded-full bg-sky-600 px-6 py-3 font-bold text-white hover:bg-sky-700">
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}

export default CheckoutSuccess;
