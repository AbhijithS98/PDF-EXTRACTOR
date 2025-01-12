import UserService from '../services/userService.js';
import  jwt  from "jsonwebtoken";

class UserController {

  async register(req, res) {  
    try {
      const { name, email, password } = req.body;
      const newUser = await UserService.registerUser({ name,email,password });
      
      res.status(201).json({
        message: 'User successfully registered',
        user: newUser,
      });
    } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).send({ message: 'Server Error' });
    }
  }


  async login(req, res) {  
    try {
      const { Email, password } = req.body;     
      console.log("hit controler: ", Email,password);
      const {user,token} = await UserService.loginUser( Email,password,res );
      
      res.status(201).json({
        userId: user._id,
        name: user.name,
        email: user.email,
        token
      });
    } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).send({ message: 'Server Error' });
    }
  }




  async logout(req, res ) {
  
    try {
      await UserService.clearCookie(req,res);
      res.status(200).json({ message: 'Logout successful' });

    } catch (error) {
      console.error('Logout error:', error);
    }
  }





  async refreshToken(req, res) {
    const refreshToken = req.cookies.refreshJwt;
  
    if (!refreshToken) {
      console.log("no refresh token in the cookie")
      res.status(401).json({ message: 'No refresh token provided, authorization denied' });
      return;
    } 
  
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '10m',
      });
      
      console.log("refreshed access token");
      
      res.json({ accessToken });
    } catch (error) {
      console.error('Refresh token error:', error.message);
      await UserService.clearCookie(req,res);
      res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
  };




  async uploadPdf(req, res) {
    try {     
      
      const user = await UserService.pdfUpload(req);

      res.status(200).json({
        message: 'File uploaded successfully',
        file: req.file,
      });

    } catch (error) {
      console.error("Uploading PDF error: ", error.message);
      res.status(500).send({ message: 'Server Error' });
    }
  }
}


export default new UserController();