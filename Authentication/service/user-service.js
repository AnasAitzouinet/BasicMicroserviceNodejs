const { UserRepo } = require("../database");
const {
  GenerateSalt,
  HashPassword,
  GenerateSignature,
  FormateData,
    ComparePassword,
} = require("../utils/index");

class User {
  constructor() {
    this.userRepo = new UserRepo();
  }
  async SignUp(userData) {
    const { username, password, email, role } = userData;
    const isUserExist = await this.userRepo.GetUserByEmail(email);
    if (isUserExist) {
      return null;
    }
    const salt = await GenerateSalt();
    const hashedPassword = await HashPassword(password, salt);
    const newUser = await this.userRepo.CreateUser({
      username,
      password: hashedPassword,
      email,
      role,
    });

    const token = await GenerateSignature({
      id: newUser._id,
      role: newUser.role,
    });
    return FormateData({ id: newUser._id, token });
  }

  async SignIn(userData) {
    const { email, password } = userData;
    const existingUser = await this.userRepo.GetUserByEmail(email);
    if (!existingUser) {
      return null;
    }
    const isMatch = await ComparePassword(password, existingUser.password);
    if (!isMatch) {
      return null;
    }
    const token = await GenerateSignature({
      id: existingUser._id,
      role: existingUser.role,
    });
    return FormateData({ id: existingUser._id, token });
  }
  async GetUser(id) {
    const existingUser = await this.userRepo.GetUserById(id);
    if (!existingUser) {
      return null;
    }
    return FormateData(existingUser);
  }

}

module.exports = User ;