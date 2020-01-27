const authorsController = require("../controllers/quotes")

// export our function that defines our routes
module.exports = function(app) {
  app.get("/api/authors", authorsController.index)
  app.post("/api/authors", authorsController.create)
  app.get("/api/quotes/:authorId", authorsController.getOneAuthor)
  app.delete("/api/quotes/:authorId/:quoteId", authorsController.deleteQuote)
  app.put("/api/authors/:authorId", authorsController.update)
  app.post("/api/write/:authorId", authorsController.createQuote)
  app.post("/api/quotesvoteUp/:authorId/:quoteId", authorsController.voteUp)
  app.post("/api/quotesvoteDown/:authorId/:quoteId", authorsController.voteDown)
}