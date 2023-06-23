const path = require("path")
const express = require("express")
require("dotenv").config()
const color = require("colors")
const cors = require("cors")
const connectDB = require("./config/db")
const { errorHandler } = require("./middleware/errorMiddleware")
const stripe = require('./routes/stripe')

connectDB()

const port = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/stripe', stripe)
app.use("/api/users", require("./routes/userRoutes"))

const fs = require("fs")
// app.get("/image", (req, res) => {
// return (__dirname + '../assets/t2/transcript-1.jpg')
// return path(__dirname)
  // fs.readFile("assets/t2/transcript-1.jpg", (err, data) => {
  //   if (err) {
  //     res.writeHead(500, { "Content-Type": "text/plain" })
  //     res.end("Error loading image")
  //   } else {
  //     // Set the content type header
  //     res.setHeader("Content-Type", "image/jpeg")
  //     // Send the image data as the response
  //     res.end(data)
  //   }
  // })
// })

// server frontend
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")))
//   app.use(express.static('/'))

//   app.use((req, res) =>
//     res.sendFile(path.join(__dirname, "../", "frontend", "dist", "index.html"))

//   )
// } else {
//   app.get("/", (req, res) => res.send("please setup production server before"))
// }

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
