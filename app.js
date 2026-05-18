const express = require("express")
const cookieParser = require("cookie-parser")

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const courseRoutes = require("./routes/courseRoutes")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/courses", courseRoutes)

module.exports = app
