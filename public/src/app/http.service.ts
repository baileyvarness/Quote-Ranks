import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAllAuthors() {
    return this._http.get("/api/authors");
  }
  
  createAuthor(authorToCreate) {
    return this._http.post("/api/authors", authorToCreate);
  }
  
  updateAuthor(authorToUpdate) {
    return this._http.put("/api/authors/" + authorToUpdate._id, authorToUpdate);
  }
  
  getOneAuthor(authorId) {
    return this._http.get("/api/quotes/" + authorId);
    // return this._http.delete(`/api/authors/${authorId}`);
  }

  createQuote(authorId, quoteToCreate) {
    return this._http.post("/api/write/" + authorId, quoteToCreate);
  }

  deleteQuote(authorId, quoteId) {
    return this._http.delete("/api/quotes/" + authorId + "/" + quoteId);
  }
  
  voteUp(authorId, quoteId) {
    return this._http.post("/api/quotesvoteUp/" + authorId + "/" + quoteId, authorId, quoteId);
  }
  voteDown(authorId, quoteId) {
    return this._http.post("/api/quotesvoteDown/" + authorId + "/" + quoteId, authorId, quoteId);
  }

}

