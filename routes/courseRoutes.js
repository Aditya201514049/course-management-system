const express = require("express")
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.use(protect)

router.post("/", createCourse)
router.get("/", getAllCourses)
router.get("/:id", getCourseById)
router.put("/:id", updateCourse)
router.delete("/:id", deleteCourse)

module.exports = router
