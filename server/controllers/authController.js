const bcrypt = require('bcryptjs');
const { db, createId } = require('../store/memoryStore');
const generateToken = require('../utils/generateToken');

const publicUser = (user) => ({ id: user.id, name: user.name, email: user.email, role: user.role });

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email, and password are required.');
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be at least 6 characters.');
  }

  const normalizedEmail = email.toLowerCase().trim();
  const exists = db.users.some((user) => user.email === normalizedEmail);
  if (exists) {
    res.status(409);
    throw new Error('An account with this email already exists.');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: createId('usr'),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    role: 'customer',
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);

  res.status(201).json({ user: publicUser(user), token: generateToken(user) });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required.');
  }

  const user = db.users.find((item) => item.email === email.toLowerCase().trim());
  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password.');
  }

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) {
    res.status(401);
    throw new Error('Invalid email or password.');
  }

  res.json({ user: publicUser(user), token: generateToken(user) });
};

const getProfile = (req, res) => {
  res.json({ user: req.user });
};

module.exports = { registerUser, loginUser, getProfile };
