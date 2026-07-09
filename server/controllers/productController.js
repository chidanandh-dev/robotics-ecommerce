const { db, createId } = require('../store/memoryStore');

const getProducts = (req, res) => {
  const { category, featured, search } = req.query;
  let products = [...db.products];

  if (category) {
    products = products.filter((product) => product.category === category);
  }

  if (featured === 'true') {
    products = products.filter((product) => product.featured);
  }

  if (search) {
    const query = search.toLowerCase();
    products = products.filter((product) =>
      `${product.name} ${product.category} ${product.shortDescription} ${product.tags?.join(' ')}`.toLowerCase().includes(query)
    );
  }

  res.json({ products });
};

const getProductById = (req, res) => {
  const product = db.products.find((item) => item.id === req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found.');
  }
  res.json({ product });
};

const createProduct = (req, res) => {
  const { name, category, price, stock, shortDescription, description } = req.body;
  if (!name || !category || price === undefined || stock === undefined || !shortDescription || !description) {
    res.status(400);
    throw new Error('Missing required product fields.');
  }

  const product = {
    id: createId('prd'),
    name,
    category,
    price: Number(price),
    stock: Number(stock),
    emoji: req.body.emoji || '🤖',
    featured: Boolean(req.body.featured),
    rating: Number(req.body.rating) || 4.8,
    shortDescription,
    description,
    tags: Array.isArray(req.body.tags) ? req.body.tags : [],
  };

  db.products.unshift(product);
  res.status(201).json({ product });
};

const updateProduct = (req, res) => {
  const product = db.products.find((item) => item.id === req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found.');
  }

  Object.assign(product, {
    ...req.body,
    price: req.body.price !== undefined ? Number(req.body.price) : product.price,
    stock: req.body.stock !== undefined ? Number(req.body.stock) : product.stock,
    rating: req.body.rating !== undefined ? Number(req.body.rating) : product.rating,
    featured: req.body.featured !== undefined ? Boolean(req.body.featured) : product.featured,
    tags: Array.isArray(req.body.tags) ? req.body.tags : product.tags,
  });

  res.json({ product });
};

const deleteProduct = (req, res) => {
  const index = db.products.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    res.status(404);
    throw new Error('Product not found.');
  }
  db.products.splice(index, 1);
  res.json({ message: 'Product deleted.' });
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
