import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { ThemePalette } from '@angular/material/core';
import { CommentTable, Recipe, User } from '../recipe/recipe.models.component';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}



@Component({
  selector: 'app-commentTable-add',
  templateUrl: './commentTable-add.component.html',
  styleUrls: ['InsertCss.css']
})
export class CommentTableAddComponent  {
  public commentTableCreate: CommentTable = <CommentTable>{};
  public recipes: Recipe[];
  public users: User[];
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
    this.loadRecipes();
    this.loadUsers();
  }

  public saveCommentTable() {
    this.http.post(this.baseUrl + 'api/commentTables', this.commentTableCreate).subscribe(result => {
      this.router.navigateByUrl("/recipes")
    }, error => console.error(error));
  }

  loadRecipes() {
    this.http.get<Recipe[]>(this.baseUrl + 'api/recipes').subscribe(result => {
      this.recipes = result;
    }, error => console.error(error));
  }


  loadUsers() {
    this.http.get<User[]>(this.baseUrl + 'api/users').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }
}

