const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
const authenticateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization') || req.header('authorization');
  let token;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else {
    token = req.header('x-auth-token');
  }

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    console.log('JWT_SECRET during verification:', process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log('Token is not valid:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Middleware to authorize user roles based on roles array
const authorizeRoles = (roles) => {
  return (req, res, next) => {
    console.log('User role:', req.user.role);
    console.log('Expected roles:', roles);
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ msg: 'Access denied: Insufficient permissions' });
    }
  };
};

// Middleware to handle errors
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'An unexpected error occurred' });
};

module.exports = {
  authenticateJWT,
  authorizeRoles,
  errorHandler,
};
