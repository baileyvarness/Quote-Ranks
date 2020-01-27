import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {
  gonnaEditIt: any;
  errors: "";

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _httpService: HttpService
  ) { 
    this.gonnaEditIt = { name: "" };
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      // console.log(params.authorId);
      this._httpService
        .getOneAuthor(params.authorId)
        .subscribe((authorObj: any) => {
          // console.log("authorObj.author: ", authorObj.author);
          this.gonnaEditIt = authorObj.author;
        });
    });
  }

  submit() {
    console.log("this.gonnaEditIt: ", this.gonnaEditIt);
    this._httpService.updateAuthor(this.gonnaEditIt).subscribe(editedAuthor => {
      console.log("*".repeat(30));
      console.log("editedAuthor: ", editedAuthor);
      if (editedAuthor.hasOwnProperty("errors")) {
        this.errors = editedAuthor["errors"].message;
        console.log("this.errors: ", this.errors);
      } else {
        this._router.navigate(["/"]);
      }
    });
  }

}
