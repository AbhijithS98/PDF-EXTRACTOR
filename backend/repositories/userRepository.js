import User from "../models/userModel.js";

class UserRepository {

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  async findUserById(_id) {
    return await User.findOne({ _id });
  }

  // Create a new user
  async createUser({ name, email, password }) {
    console.log("hit repo");
    const newUser = new User({ name, email, password });
    await newUser.save(); 
    return newUser;
  }


  async updateUserById(userId, updateLogic, options = {}) {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, updateLogic, {
        new: true, 
        ...options,
      });
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error.message);
      throw new Error("Failed to update user");
    }
  }

}

export default new UserRepository();