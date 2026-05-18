const path = require("path")

require("dotenv").config({ path: path.join(__dirname, ".env") })

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing. Add it to your .env file.")
  process.exit(1)
}

const app = require("./app")
const connectDB = require("./config/db")

connectDB()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})