const jwt = require('jsonwebtoken');
const { db } = require('../store/memoryStore');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401);
    throw new Error('Not authorized. Missing token.');
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_key');
    const user = db.users.find((item) => item.id === decoded.id);

    if (!user) {
      res.status(401);
      throw new Error('Not authorized. User not found.');
    }

    req.user = { id: user.id, name: user.name, email: user.email, role: user.role };
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized. Invalid token.');
  }
};

module.exports = { protect };
