import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentTable } from '../recipe/recipe.models.component';

@Component({
  selector: 'app-commentTable-update',
  templateUrl: './commentTable-update.component.html',
  styleUrls: ['input.css'],

})
export class CommentTableUpdateComponent implements OnInit {
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  public id: string;
  public commentTable: CommentTable = <CommentTable>{};
  
  ngOnInit() {
   
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
      this.loadCommentTables();
    });

  }

  public loadCommentTables() {
    this.http.get<CommentTable>(this.baseUrl + 'api/commentTables/' + this.id).subscribe(result => {
      this.commentTable = result;
    }, error => console.error(error))
  }

  public updateCommentTable() {
    this.http.put<CommentTable>(this.baseUrl + 'api/commentTables/' + this.id, this.commentTable).subscribe(result => {
      this.router.navigateByUrl("/recipeList-read/" + this.commentTable.recipeID);
    }, error => console.error(error))
  }
}
