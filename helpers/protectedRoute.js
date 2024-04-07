const jwt = require("jsonwebtoken");


const protectRoute = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_REFRESH_TOKEN);
      req.userId = decoded._id;
      next();
    } catch (error) {
        console.log(error);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };
  module.exports = protectRoute;