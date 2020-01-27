const mongoose = require("mongoose")
const Author = mongoose.model("Author")

module.exports = {
  index(req, res) {
    Author.find()
      .then(authors => {
        // res.json({ authors })
        res.json({ authors: authors })
      })
      .catch(err => res.json({ errors: err }))
  },
  create(req, res) {
    console.log(req.body)
    Author.create(req.body)
      .then(newAuthor => {
        // res.json({ author })
        res.json({ author: newAuthor })
      })
      .catch(err => res.json({ errors: err }))
  },
  getOneAuthor(req, res) {
    console.log(req.params.authorId)
    Author.findById(req.params.authorId)
      .then(author => {
        console.log("author: ", author)
        res.json({ author: author })
      })
      .catch(err => res.json({ errors: err }))
  },
  update(req, res) {
    console.log(req.params.authorId)
    console.log("req.body", req.body)
    Author.findByIdAndUpdate(req.params.authorId, req.body, {
      runValidators: true
    })
      .then(updatedAuthor => {
        console.log("updatedAuthor: ", updatedAuthor)
        res.json({ author: updatedAuthor })
      })
      .catch(err => res.json({ errors: err }))
  },
  createQuote(req, res) {
    Author.update({ _id: req.params.authorId }, {
      $push: {quotes: {quote: req.body.quote }}
    })
    .then(createdQuote => {
      console.log("createdQuote: ", createdQuote)
      res.json({ author: createdQuote })
    })
    .catch(err => res.json({ errors: err }))
  },
  deleteQuote(req, res) {
    console.log("author id: ", req.params.authorId)
    console.log("quote id:" ,req.params.quoteId)
    Author.findById({_id: req.params.authorId})
      .then(authorWithQuote => {
        console.log("authorWithQuote: ", authorWithQuote)
        //FILTER THE QUOTES
        const isQuoteId = quoteObject => {
          console.log(quoteObject._id, req.params.quoteId)
          console.log('quoteObject._id != req.params.quoteId ', quoteObject._id != req.params.quoteId)
          return quoteObject._id != req.params.quoteId
        }
        const keptQuotes = authorWithQuote.quotes.filter(isQuoteId)
        console.log(keptQuotes)
        //SAVE
        authorWithQuote.quotes = keptQuotes
        authorWithQuote.save()
        res.json({ author: authorWithQuote })
      })
      .catch(err => res.json({ errors: err }))
  },
  voteUp(req, res) {
    console.log("req.params.authorId: ", req.params.authorId)
    console.log("req.params.quoteId: ", req.params.quoteId)
    Author.findById({_id: req.params.authorId})
      .then(authorWithQuote => {
        console.log("authorWithQuote: ", authorWithQuote)
        for (let index = 0; index < authorWithQuote.quotes.length; index++) {
          if (authorWithQuote.quotes[index]._id == req.params.quoteId) {
            authorWithQuote.quotes[index].vote++
            console.log(authorWithQuote.quotes[index].vote)
          }
        }
        authorWithQuote.save()
        res.json({ author: authorWithQuote })
      })
      .catch(err => {
        console.log(err)
        res.json({ errors: err })
      })
  },
  voteDown(req, res) {
    console.log("req.params.authorId: ", req.params.authorId)
    console.log("req.params.quoteId: ", req.params.quoteId)
    Author.findById({_id: req.params.authorId})
      .then(authorWithQuote => {
        console.log("authorWithQuote: ", authorWithQuote)
        for (let index = 0; index < authorWithQuote.quotes.length; index++) {
          if (authorWithQuote.quotes[index]._id == req.params.quoteId) {
            authorWithQuote.quotes[index].vote--
            console.log(authorWithQuote.quotes[index].vote)
          }
        }
        authorWithQuote.save()
        res.json({ author: authorWithQuote })
      })
      .catch(err => {
        console.log(err)
        res.json({ errors: err })
      })
  }
}