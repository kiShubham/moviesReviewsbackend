//import servies
const authServices = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const userData = req.body;
    const user = await authServices.register(userData);
    res.status(201).json({
      message: "successfully registered",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  // give jwt token
  try {
    const inputData = req.body;
    const auth = await authServices.login(inputData);
    res.status(200).json({
      meassage: "user loggedIn successfully",
      token: auth.token,
      user: auth.getUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login, register };
