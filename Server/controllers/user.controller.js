import User from "../models/user.model.js";
import { generateToken } from "../util/generateToken.js";
import { sendMail } from "../util/notification.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "All fields are required", success: false });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists", success: false });
    }
    const user = new User({ name, email, password });
    await user.save();
    await sendMail(
      user.email,
      `🎉 Welcome to MyTodo App – Let’s Get Things Done!`,
        `Hi ${user.name},
    Welcome to the MyTodo App! 🎉 
    We’re excited to have you on board. Start organizing your tasks and boosting your productivity today.  
    ✅ Create and manage your to-do lists  
    ✅ Stay on track with deadlines  
    ✅ Enjoy a smooth and simple experience 
    🚀 Get started now: [Your App Link]  
    If you have any questions, feel free to reply to this email.  
        
    Best Regards,  
    The MyTodo App Team `
    );
    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.log("Internal server error ", error.message);
    return res
      .status(500)
      .json({ error: "Internal server error", success: false });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Some fields are missing", success: false });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "Invalid credentials", success: false });
    }
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "Invalid credentials", success: false });
    }
    const token = await generateToken(user._id, res);

    user = await User.findById(user._id).select("-password");

    res.status(200).json({ message: "Login successful", success: true, user,token });
  } catch (error) {
    log("Internal server error ", error.message);
    return res
      .status(500)
      .json({ error: "Internal server error", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.error("Logout error:", error); // More detailed error logging
    return res.status(500).json({
      error: "Internal server error",
      success: false,
      message: error.message, // Optional: include error message in development
    });
  }
};
