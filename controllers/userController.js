const User = require("../models/User")

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phoneNumber: user.phoneNumber,
})

const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: formatUser(req.user),
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const updateProfile = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body

    if (!name && !email && !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update",
      })
    }

    if (email) {
      const emailExists = await User.findOne({
        email,
        _id: { $ne: req.user._id },
      })
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email is already in use",
        })
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { ...(name && { name }), ...(email && { email }), ...(phoneNumber && { phoneNumber }) },
      { new: true, runValidators: true }
    )

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: formatUser(updatedUser),
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email is already in use",
      })
    }

    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = { getProfile, updateProfile }
