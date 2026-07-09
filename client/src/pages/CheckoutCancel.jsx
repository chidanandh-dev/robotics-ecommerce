import { XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

function CheckoutCancel() {
  return (
    <section className="container-page grid min-h-[calc(100vh-8rem)] place-items-center py-12">
      <div className="max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
        <XCircle className="mx-auto mb-4 text-rose-500" size={64} />
        <h1 className="text-4xl font-black text-slate-950">Checkout cancelled</h1>
        <p className="mt-4 leading-7 text-slate-600">Your cart is still saved. You can return and complete the payment anytime.</p>
        <Link to="/cart" className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 font-bold text-white hover:bg-sky-700">
          Back to Cart
        </Link>
      </div>
    </section>
  );
}

export default CheckoutCancel;
