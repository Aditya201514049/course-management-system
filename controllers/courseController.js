const mongoose = require("mongoose")
const Course = require("../models/Course")

const courseFields = [
  "title",
  "description",
  "price",
  "duration",
  "category",
  "instructorName",
  "courseImage",
]

const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      duration,
      category,
      instructorName,
      courseImage,
    } = req.body

    if (
      !title ||
      !description ||
      price === undefined ||
      !duration ||
      !category ||
      !instructorName ||
      !courseImage
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all course fields",
      })
    }

    const course = await Course.create({
      title,
      description,
      price,
      duration,
      category,
      instructorName,
      courseImage,
    })

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const getCourseById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course id",
      })
    }

    const course = await Course.findById(req.params.id)
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    res.status(200).json({
      success: true,
      course,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const updateCourse = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course id",
      })
    }

    const updates = {}
    for (const field of courseFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field]
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update",
      })
    }

    const course = await Course.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    })

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const deleteCourse = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course id",
      })
    }

    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
}
