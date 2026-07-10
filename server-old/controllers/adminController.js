const { db } = require('../store/memoryStore');

const getStats = (req, res) => {
  const revenue = db.orders.reduce((sum, order) => sum + order.total, 0);
  res.json({
    stats: {
      totalProducts: db.products.length,
      totalOrders: db.orders.length,
      totalUsers: db.users.length,
      totalMessages: db.messages.length,
      revenue,
    },
  });
};

const getOrders = (req, res) => {
  res.json({ orders: db.orders });
};

const getMessages = (req, res) => {
  res.json({ messages: db.messages });
};

module.exports = { getStats, getOrders, getMessages };
