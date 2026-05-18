const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    instructorName: {
      type: String,
      required: [true, "Instructor name is required"],
      trim: true,
    },
    courseImage: {
      type: String,
      required: [true, "Course image is required"],
      trim: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Course", courseSchema)
