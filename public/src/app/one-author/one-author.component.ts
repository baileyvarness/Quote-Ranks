import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-one-author',
  templateUrl: './one-author.component.html',
  styleUrls: ['./one-author.component.css']
})
export class OneAuthorComponent implements OnInit {
  oneAuthor: any

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _httpService: HttpService) { 
      this.oneAuthor = { name: ""};
    }

  ngOnInit() {
    this.getAuthor()
  }

  getAuthor(){
    this._route.params.subscribe(params => {
      // console.log(params.authorId);
      this._httpService
        .getOneAuthor(params.authorId)
        .subscribe((authorObj: any) => {
          console.log("authorObj.author: ", authorObj.author);
          this.oneAuthor = authorObj.author;
        });
    });
  }

  delete(quoteId) {
    console.log("quoteId: ", quoteId);
    // all we need is the author id
    this._httpService.deleteQuote(this.oneAuthor._id, quoteId)
    .subscribe(deleted => {
      console.log("deleted: ", deleted);
      this.getAuthor()
    });
  }

  voteUp(quoteId) {
    console.log("quoteId: ", quoteId);
    this._httpService.voteUp(this.oneAuthor._id, quoteId)
    .subscribe(upVote => {
      console.log("upVote: ", upVote);
      this.getAuthor()
    });
  }

  voteDown(quoteId) {
    console.log("quoteId: ", quoteId);
    this._httpService.voteDown(this.oneAuthor._id, quoteId)
    .subscribe(downVote => {
      console.log("downVote: ", downVote);
      this.getAuthor()
    });
  }

}