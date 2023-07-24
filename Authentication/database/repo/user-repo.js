const mongoose = require("mongoose");
const User = require("../model/User");

class UserRepo {
  async CreateUser({ username, password, email, role }) {
    try {
      const newUser = new User({
        username,
        password,
        email,
        role,
      });
      const result = await newUser.save();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async GetUserByEmail(email) {
    const existingUser = await User.findOne({ email });
    return existingUser ? existingUser : null;
  }

  async GetUserById(id) {
    const existingUser = await User.findById(id);
    return existingUser ? existingUser : null;
  }


}

module.exports = UserRepo;