const bcrypt = require('bcryptjs');
const { products: initialProducts } = require('../utils/sampleProducts');

const db = {
  users: [],
  products: initialProducts,
  orders: [],
  messages: [],
};

const createId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;

const seedAdmin = () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@roboticsnetcom.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  const exists = db.users.some((user) => user.email === adminEmail);
  if (!exists) {
    const passwordHash = bcrypt.hashSync(adminPassword, 10);
    db.users.push({
      id: 'admin_1',
      name: 'Admin',
      email: adminEmail,
      passwordHash,
      role: 'admin',
      createdAt: new Date().toISOString(),
    });
  }
};

module.exports = { db, createId, seedAdmin };
