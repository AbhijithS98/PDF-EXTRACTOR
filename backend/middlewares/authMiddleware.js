import jwt from 'jsonwebtoken';

const verifyUserToken = async (req, res, next) => {
  const token = req.cookies?.accessJwt; 

  if (!token) {
    console.error("no token provided: ", req.cookies)
    res.status(401).json({ message: 'Unauthorized access' });
    return;
  } 

  try {
    console.log("Received Cookies:", req.cookies);
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
   
    req.user = decoded;
    
  } catch (error) {
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
  next();
};  

export default verifyUserToken;
