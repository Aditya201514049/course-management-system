const express = require("express")
const app = express()

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/courses", courseRoutes)

module.exports = app