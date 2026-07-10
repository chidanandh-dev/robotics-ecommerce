const Stripe = require('stripe');
const { db, createId } = require('../store/memoryStore');

const createCheckoutSession = async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error('Cart items are required.');
  }

  const validatedItems = items.map((cartItem) => {
    const product = db.products.find((item) => item.id === cartItem.id);
    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${cartItem.id}`);
    }
    return {
      product,
      quantity: Math.max(1, Number(cartItem.quantity) || 1),
    };
  });

  const total = validatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0) + 150;

  const order = {
    id: createId('ord'),
    userId: req.user.id,
    customerEmail: req.user.email,
    items: validatedItems.map((item) => ({ productId: item.product.id, name: item.product.name, quantity: item.quantity, price: item.product.price })),
    total,
    status: process.env.STRIPE_SECRET_KEY ? 'pending_payment' : 'demo_paid',
    createdAt: new Date().toISOString(),
  };
  db.orders.unshift(order);

  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.json({
      url: `${clientUrl}/checkout-success?demo=true&order=${order.id}`,
      order,
      demo: true,
    });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: req.user.email,
    line_items: validatedItems.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.product.name,
          description: item.product.shortDescription,
        },
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.quantity,
    })),
    success_url: `${clientUrl}/checkout-success?session_id={CHECKOUT_SESSION_ID}&order=${order.id}`,
    cancel_url: `${clientUrl}/checkout-cancel`,
    metadata: {
      orderId: order.id,
      userId: req.user.id,
    },
  });

  res.json({ url: session.url, orderId: order.id });
};

module.exports = { createCheckoutSession };
