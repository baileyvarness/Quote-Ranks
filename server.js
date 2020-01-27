const express = require("express")

const app = express()
const path = require("path")

// using json
app.use(express.json())

// serving static assets from this place
app.use(express.static(path.join(__dirname, "public/dist/public")))

// mongoose
require("./server/config/mongoose")

// routes
require("./server/config/routes")(app)

// catch all route
app.all("*", (request, response) => {
  response.sendFile(path.join(__dirname, "/public/dist/public/index.html"))
})

// listen
app.listen(8000, () => console.log("listening on port 8000"))