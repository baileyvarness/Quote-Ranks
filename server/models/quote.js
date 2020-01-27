const mongoose = require("mongoose")

const AuthorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      minlength: [3, "Name must be at least 3 characters."]
    },
    quotes: [{
      quote: {
        type: String,
        required: [true, "Quote is required."],
        minlength: [3, "Quote must be at least 3 characters."]
      },
      vote: {
        type: Number,
        default: 0
      },
    }]
  },
  { timestamps: true }
)

mongoose.model("Author", AuthorSchema)