import UserRepository from "../repositories/userRepository.js";
import generateTokens from "../utils/generateToken.js";

class UserService {

  // Register User
  async registerUser({name, email, password}) {
    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }    
    const newUser = await UserRepository.createUser({ name, email, password });  
    return newUser;
  }




  async loginUser(email, password, res) {
    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    // Generate JWT token for the user
    const token = generateTokens(res,user._id)
    return user;
  }




  async clearCookie(req, res) {
   
    try {
      res.cookie('AccessJwt', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires: new Date(0),  
      });

    } catch (error) {
      throw new Error('Error clearing cookies');
    }
  }
}


export default new UserService();
