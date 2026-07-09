import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <div className="grid h-24 w-full place-items-center rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50 text-5xl sm:w-28">
        {item.emoji || '🤖'}
      </div>

      <div className="flex-1">
        <p className="text-xs font-bold uppercase tracking-wide text-sky-600">{item.category}</p>
        <h3 className="text-lg font-bold text-slate-950">{item.name}</h3>
        <p className="text-sm text-slate-500">₹{item.price.toLocaleString('en-IN')} each</p>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <div className="flex items-center overflow-hidden rounded-full border border-slate-300">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-2 hover:bg-slate-100"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="min-w-10 text-center font-bold">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-2 hover:bg-slate-100"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>

        <p className="w-28 text-right font-black text-slate-950">
          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
        </p>

        <button
          onClick={() => removeFromCart(item.id)}
          className="rounded-full p-2 text-rose-600 hover:bg-rose-50"
          aria-label="Remove item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
