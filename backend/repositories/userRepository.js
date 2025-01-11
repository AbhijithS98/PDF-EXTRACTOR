import User from "../models/userModel.js";

class UserRepository {

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  // Create a new user
  async createUser({ name, email, password }) {
    console.log("hit repo");
    const newUser = new User({ name, email, password });
    await newUser.save(); 
    return newUser;
  }

}

export default new UserRepository();