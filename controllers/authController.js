const bcrypt = require("bcryptjs")
const User = require("../models/User")

const register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body

    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, password, and phone number",
      })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    })

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      })
    }

    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = { register }
