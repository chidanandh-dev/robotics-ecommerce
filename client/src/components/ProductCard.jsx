import { ArrowRight, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import productImage from '../logo.png.png';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const imageSrc = product.image || productImage;
  const canAddToCart = product.category !== 'Online Training';

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative grid h-48 place-items-center bg-gradient-to-br from-slate-100 via-sky-50 to-emerald-50 p-6">
          <img src={imageSrc} alt={product.name} className="h-32 w-full rounded-2xl object-cover" />
          {product.featured && (
            <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
              Featured
            </span>
          )}
        </div>
      </Link>

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-sky-600">{product.category}</p>
            <Link to={`/products/${product.id}`} className="text-lg font-bold text-slate-950 hover:text-sky-700">
              {product.name}
            </Link>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
            <Star size={14} fill="currentColor" /> {product.rating}
          </div>
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-6 text-slate-600">{product.shortDescription}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {product.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xl font-black text-slate-950">₹{product.price.toLocaleString('en-IN')}</p>
            <p className="text-xs text-slate-500">Inclusive of GST</p>
          </div>
          {canAddToCart ? (
            <button
              onClick={() => addToCart(product)}
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-sky-700"
            >
              <ShoppingCart size={17} /> Add
            </button>
          ) : (
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500">
              Course only
            </span>
          )}
        </div>

        <Link to={`/products/${product.id}`} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-sky-700 hover:gap-2">
          View details <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
