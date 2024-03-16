const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (userData) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) throw new error("user already exist");

    const user = new User(userData);

    const salt = await bcrypt.genSalt(10); // genraitng salt
    const hashPassword = await bcrypt.hash(userData.password, salt); // hashing the password
    user.password = hashPassword; // saving hashpassword

    await user.save(); // savign the user
    return user;
  } catch (error) {
    throw error;
  }
};

const login = async (inputData) => {
  try {
    //is the email is registered
    // check password ;
    const { email, password } = inputData;
    //
    const user = await User.findOne({ email: email });
    if (!user) throw new error("user dont exist");

    const passwordCheck = await user.comparePassword(password);

    if (!passwordCheck) throw new error("incorrect password");

    // return a token and let login ;
    const token = jwt.sign({ id: user._id }, process.env.JWT_Secret);
    return { token, user };
    //
  } catch (error) {
    throw error;
  }
};
module.exports = { register, login };
