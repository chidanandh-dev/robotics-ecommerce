import { ArrowLeft, CheckCircle2, MessageCircle, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import productImage from '../logo.png.png';
import { getProductById } from '../services/productService.js';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const canAddToCart = product?.category !== 'Online Training';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleWhatsApp = () => {
    if (!product) return;
    const text = `Hi, I'm interested in buying:
*${product.name}*
Price: ₹${product.price.toLocaleString('en-IN')}
Link: ${window.location.href}`;

    const whatsappUrl = `https://wa.me/917907354117?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((data) => setProduct(data.product))
      .catch(() => setError('Product not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="container-page py-16 text-center font-bold text-slate-600">Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="text-3xl font-black text-slate-950">Product not found</h1>
        <Link to="/products" className="mt-4 inline-flex items-center gap-2 text-sky-700 font-bold">
          <ArrowLeft size={18} /> Back to products
        </Link>
      </div>
    );
  }

  return (
    <section className="container-page py-10 md:py-16">
      <Link to="/products" className="mb-8 inline-flex items-center gap-2 font-bold text-sky-700 hover:gap-3">
        <ArrowLeft size={18} /> Back to catalog
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="grid min-h-[420px] place-items-center rounded-[2rem] bg-gradient-to-br from-slate-100 via-sky-50 to-emerald-50 p-8 shadow-sm">
          <img src={product.image || productImage} alt={product.name} className="max-h-72 w-full max-w-md rounded-[2rem] object-cover" />
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-600">{product.category}</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-700">
              <Star size={16} fill="currentColor" /> {product.rating} rating
            </span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <p className="mt-6 text-lg leading-8 text-slate-600">{product.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.tags?.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-3xl font-black text-slate-950">₹{product.price.toLocaleString('en-IN')}</p>
            <p className="mt-1 text-sm text-slate-500">Inclusive of GST. Shipping calculated during checkout.</p>
            {canAddToCart ? (
              <button
                onClick={handleWhatsApp}
                disabled={product.stock <= 0}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 font-black text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <MessageCircle size={20} /> Order on WhatsApp
              </button>
            ) : (
              <div className="mt-6 rounded-full border border-slate-200 bg-slate-100 px-6 py-3 text-center text-sm font-bold text-slate-600">
                Training courses are available through contact enquiry
              </div>
            )}
          </div>

          <div className="mt-8 grid gap-3">
            {['Project guide included', 'Student friendly support', 'Compatible with online robotics classes'].map((item) => (
              <p key={item} className="flex items-center gap-3 font-semibold text-slate-700">
                <CheckCircle2 className="text-emerald-500" /> {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
