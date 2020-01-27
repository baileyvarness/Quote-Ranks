import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.css']
})
export class NewAuthorComponent implements OnInit {
  authorToCreate: any;
  errors = "";

  constructor(
    private _httpService: HttpService, 
    private _router: Router) { 
    this.authorToCreate = { name: "" };
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log("trying to submit!");
    this._httpService
      .createAuthor(this.authorToCreate)
      .subscribe(createdAuthor => {
        console.log("createdAuthor: ", createdAuthor);
        if (createdAuthor.hasOwnProperty("errors")) {
          this.errors = createdAuthor["errors"].message;
          console.log("this.errors: ", this.errors);
        } else {
          this._router.navigate(["/"]);
        }
      });
  }

}