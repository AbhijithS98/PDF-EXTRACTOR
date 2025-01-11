import UserService from '../services/userService.js';

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
      const user = await UserService.loginUser( Email,password,res );
      
      res.status(201).json({
        userId: user._id,
        name: user.name,
        email: user.email,
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

}


export default new UserController();