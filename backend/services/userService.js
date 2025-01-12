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
    return {user,token};
  }



  async clearCookie(req, res) {
   
    try {
      res.cookie('refreshJwt', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires: new Date(0),  
      });

    } catch (error) {
      throw new Error('Error clearing cookies');
    }
  }




  async pdfUpload(req) {
    
    const _id = req.user.userId;
    const User = await UserRepository.findUserById(_id);
    if (!User) {
        const error = Error("User not exists");
        error.name = 'ValidationError';  
        throw error;
    }
  
    console.log("filepath", req.file?.path);
    const uploadedFilePath = req.file?.path.replace(/\\/g, "/").replace(/^public\//, "") ?? null;
    const uploadedFileName = req.file?.originalname;
    console.log("newpath", uploadedFilePath);

    if (!uploadedFilePath || !uploadedFileName) {
      const error = new Error("No file uploaded");
      error.name = "ValidationError";
      throw error;
    }
   
    const newUploadedFile = {
    fileName: uploadedFileName,
    filePath: uploadedFilePath,
    uploadedAt: new Date(),
    };

    const updatedUser = await UserRepository.updateUserById(
      _id,
      { $push: { "pdfFiles.uploaded": newUploadedFile } }
    );

    return updatedUser;
  }
}


export default new UserService();
