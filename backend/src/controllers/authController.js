import authService from "../services/authService.js";

export const login = async (req, res) => {
    try {
      const token = await authService.loginUser(req.body);
      return res.status(200).json({
        success: true, 
        message: "Login successful!",
        token
      })
    } catch (err) {
      return res.status(err.status || 500).json({
        success: false,
        message: err.message
      })
    }
}

export const register = async (req, res) => {
  try {
    await authService.registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "Registration successful!"
    })
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    })
  }
};
