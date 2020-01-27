import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.css']
})
export class NewQuoteComponent implements OnInit {
  quoteToCreate: any;
  oneAuthor: any
  errors = "";

  constructor(
    private _httpService: HttpService, 
    private _router: Router,
    private _route: ActivatedRoute) {
    this.quoteToCreate = { quote: "" };
  }

  ngOnInit() {
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

  onSubmit() {
    console.log("trying to submit!");
    this._httpService
      .createQuote(this.oneAuthor._id, this.quoteToCreate)
      .subscribe(createdQuote => {
        console.log("createdQuote: ", createdQuote);
        if (createdQuote.hasOwnProperty("errors")) {
          this.errors = createdQuote["errors"].message;
          console.log("this.errors: ", this.errors);
        } else {
          this._router.navigate(["/quotes/", this.oneAuthor._id]);
        }
      });
  }
}
