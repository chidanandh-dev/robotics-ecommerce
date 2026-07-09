import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { categories } from '../data/categories.js';
import { getProducts } from '../services/productService.js';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const category = searchParams.get('category') || 'All';

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data) => {
        console.log('getProducts response:', data);
        setProducts(data.products);
      })
      .catch((err) => {
        console.error('getProducts error:', err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const searchText = `${product.name} ${product.category} ${product.shortDescription} ${product.tags?.join(' ')}`.toLowerCase();
      const matchesSearch = searchText.includes(query.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, category, query]);

  const handleCategory = (value) => {
    if (value === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Product Catalog"
        title="Robotics kits and online learning programs"
        description="Find complete project kits, starter kits, AI robotics kits, and structured online robotics training programs."
      />

      <section className="container-page py-10">
        <div className="mb-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search kits, Arduino, AI, sensors, training..."
              className="w-full rounded-2xl border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />
          </div>
          <p className="text-sm font-semibold text-slate-500">{filteredProducts.length} items found</p>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => handleCategory(item)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${
                category === item ? 'bg-sky-600 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center font-bold text-slate-600">Loading products...</div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-2xl font-black text-slate-950">No products found</h2>
            <p className="mt-2 text-slate-600">Try another search term or category.</p>
          </div>
        )}
      </section>
    </>
  );
}

export default Products;
