import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-all-authors',
  templateUrl: './all-authors.component.html',
  styleUrls: ['./all-authors.component.css']
})
export class AllAuthorsComponent implements OnInit {
  allAuthors: any[] = []
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    this._httpService.getAllAuthors().subscribe(authorsWeGot => {
      console.log("authorsWeGot: ", authorsWeGot);
      this.allAuthors = authorsWeGot["authors"];
    });
  }

  // delete(authorId) {
  //   console.log("authorId: ", authorId);
  //   // all we need is the author id
  //   // this._httpService.deleteAuthor(authorId)
  //   .subscribe(deleted => {
  //     console.log("deleted: ", deleted);
  //     this.getAuthors();
  //   });
  // }

}
