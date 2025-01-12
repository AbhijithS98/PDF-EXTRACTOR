import jwt from 'jsonwebtoken';

const verifyUserToken = (req, res, next) => {

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
       
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    // Handle specific error for expired token
    if (error.name === 'TokenExpiredError') {
      console.log("ac tk expired");
      
      return res.status(401).json({ message: 'Token expired', code: 'TOKEN_EXPIRED' });
    }
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};  

export default verifyUserToken;
