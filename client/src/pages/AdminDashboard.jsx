import { Edit, MessageSquare, Package, Plus, Save, ShoppingCart, Trash2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import { getAdminStats, getMessages, getOrders } from '../services/adminService.js';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../services/productService.js';

const emptyForm = {
  name: '',
  category: 'Starter Kit',
  price: '',
  stock: '',
  emoji: '🤖',
  shortDescription: '',
  description: '',
  tags: '',
  featured: false,
  rating: 4.8,
};

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('');

  const loadData = async () => {
    const [statsData, productData, orderData, messageData] = await Promise.all([
      getAdminStats(),
      getProducts(),
      getOrders(),
      getMessages(),
    ]);
    setStats(statsData.stats);
    setProducts(productData.products);
    setOrders(orderData.orders);
    setMessages(messageData.messages);
  };

  useEffect(() => {
    loadData().catch(() => setStatus('Unable to load admin data.'));
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      rating: Number(form.rating),
      tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    };

    try {
      if (editingId) {
        await updateProduct(editingId, payload);
        setStatus('Product updated.');
      } else {
        await createProduct(payload);
        setStatus('Product created.');
      }
      setForm(emptyForm);
      setEditingId(null);
      await loadData();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Unable to save product.');
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      ...product,
      tags: product.tags?.join(', ') || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    await deleteProduct(id);
    await loadData();
  };

  return (
    <>
      <PageHeader
        eyebrow="Admin Dashboard"
        title="Manage robotics products, orders, and leads"
        description="Create catalog items, monitor demo orders, and review contact enquiries."
      />

      <section className="container-page space-y-8 py-10">
        {status && <div className="rounded-2xl bg-sky-50 p-4 font-bold text-sky-700">{status}</div>}

        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Products', value: stats?.totalProducts || 0, icon: Package },
            { label: 'Orders', value: stats?.totalOrders || 0, icon: ShoppingCart },
            { label: 'Users', value: stats?.totalUsers || 0, icon: Users },
            { label: 'Messages', value: stats?.totalMessages || 0, icon: MessageSquare },
          ].map((card) => (
            <div key={card.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <card.icon className="mb-3 text-sky-600" />
              <p className="text-sm font-semibold text-slate-500">{card.label}</p>
              <p className="text-3xl font-black text-slate-950">{card.value}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-black text-slate-950">
            {editingId ? <Edit /> : <Plus />} {editingId ? 'Edit Product' : 'Add Product'}
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Product name" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500" />
            <select name="category" value={form.category} onChange={handleChange} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500">
              {['Starter Kit', 'Advanced Kit', 'AI Robotics', 'Online Training', 'School Program'].map((category) => <option key={category}>{category}</option>)}
            </select>
            <input name="emoji" value={form.emoji} onChange={handleChange} placeholder="Emoji" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500" />
            <input name="price" type="number" value={form.price} onChange={handleChange} required placeholder="Price" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500" />
            <input name="stock" type="number" value={form.stock} onChange={handleChange} required placeholder="Stock" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500" />
            <input name="rating" type="number" step="0.1" value={form.rating} onChange={handleChange} placeholder="Rating" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500" />
            <input name="shortDescription" value={form.shortDescription} onChange={handleChange} required placeholder="Short description" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500 md:col-span-3" />
            <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Full description" rows="4" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500 md:col-span-3" />
            <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags separated by comma" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500 md:col-span-2" />
            <label className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 font-bold text-slate-700">
              <input name="featured" type="checkbox" checked={Boolean(form.featured)} onChange={handleChange} /> Featured
            </label>
          </div>
          <div className="mt-5 flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 font-black text-white hover:bg-sky-700">
              <Save size={18} /> {editingId ? 'Update Product' : 'Save Product'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="rounded-full bg-slate-100 px-6 py-3 font-black text-slate-700 hover:bg-slate-200">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-slate-950">Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-3">Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Featured</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-slate-100">
                    <td className="py-4 font-bold text-slate-950">{product.emoji} {product.name}</td>
                    <td>{product.category}</td>
                    <td>₹{product.price.toLocaleString('en-IN')}</td>
                    <td>{product.stock}</td>
                    <td>{product.featured ? 'Yes' : 'No'}</td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(product)} className="rounded-full p-2 text-sky-700 hover:bg-sky-50"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(product.id)} className="rounded-full p-2 text-rose-600 hover:bg-rose-50"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-black text-slate-950">Recent Orders</h2>
            <div className="space-y-3">
              {orders.length ? orders.map((order) => (
                <div key={order.id} className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-bold text-slate-950">Order #{order.id}</p>
                  <p className="text-sm text-slate-600">{order.customerEmail} · ₹{order.total.toLocaleString('en-IN')} · {order.status}</p>
                </div>
              )) : <p className="text-slate-500">No orders yet.</p>}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-black text-slate-950">Contact Messages</h2>
            <div className="space-y-3">
              {messages.length ? messages.map((message) => (
                <div key={message.id} className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-bold text-slate-950">{message.subject}</p>
                  <p className="text-sm text-slate-600">{message.name} · {message.email}</p>
                  <p className="mt-2 text-sm text-slate-700">{message.message}</p>
                </div>
              )) : <p className="text-slate-500">No messages yet.</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminDashboard;
