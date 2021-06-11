import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommentTable, Ingredient, IngredientData, Rating, Recipe, User } from '../recipe/recipe.models.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-recipeList-read',
  styleUrls: ['recipeList-read.component.css', 'InsertCss.css'],
  templateUrl: './recipeList-read.component.html'
})

export class RecipeListReadComponent implements OnInit {
  dataSourceComment: MatTableDataSource<CommentTable>;
  @ViewChild(MatSort) sort: MatSort;


  public id: string;
  public recipe: Recipe = <Recipe>{};
  public recipes: Recipe[];
  public users: User[];
  public ingredients: Ingredient[];
  public ingredientsData: IngredientData[];
  public ingredientData: IngredientData = <IngredientData>{};
  public ratings: Rating[];
  public commentTables: CommentTable[];

  displayedColumnsComments: string[] = ['msg', 'time'];

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router,
    private activateRouter: ActivatedRoute) {

  }

  ngOnInit() {

    this.activateRouter.params.subscribe(param => {

      this.id = param['id'];
      this.loadRecipes();
      this.loadRecipe();
      this.loadUsers();
      this.loadIngredients();
      this.loadIngredientsData();
      this.loadRatings();
      this.loadComments();
      this.commentRecipes = [];
      this.foundRecipes = false;
    });
  }

  counter(i: number) {
    return new Array(Number(i));
  }


  average(res) {
    if (!this.ratings)
      return "empty";

    let average = 0;
    let devideBy = 0;
    for (let i = 0; i < this.ratings.length; i++) {
      if (res.id == this.ratings[i].recipeID) {
        average += this.ratings[i].ratingNr;
      }
    }

    for (let i = 0; i < this.ratings.length; i++) {
      if (res.id == this.ratings[i].recipeID) {
        if (this.ratings[i].ratingNr != 0) {
          devideBy++;
        }
      }
    }

    average /= devideBy;
    if (average == 0 || !average) {
      return "empty"
    }
    return Math.floor(average);
  }


  loadRecipes() {
    this.http.get<Recipe[]>(this.baseUrl + 'api/recipes').subscribe(result => {
      this.recipes = result;
    }, error => console.error(error));
  }

  public commentRecipes: Recipe[] = [];
  public foundRecipes: boolean = false;
  commentPeopleRecipes() {
    let userComments: User[] = [];
    for (let i = 0; i < this.commentTables.length; i++) {
      if (this.commentTables[i].recipeID == this.recipe.id) {
        for (let k = 0; k < this.users.length; k++) {
          if (this.commentTables[i].userID == this.users[k].id && this.users[k].id != this.recipe.authorId)
              userComments.push(this.users[k])
          }
        }
    }
    var userCommentsUnique = this.toUniqueArray(userComments);

    for (let i = 0; i < userCommentsUnique.length; i++) {
      for (let j = 0; j < this.recipes.length; j++) {
        if (userCommentsUnique[i].id == this.recipes[j].authorId) {
          if (this.commentRecipes.length < 5) {
            this.foundRecipes = true;
          this.commentRecipes.push(this.recipes[j])
          }
        }
      }
    }
  }

  public toUniqueArray(a) {
  var newArr = [];
  for (var i = 0; i < a.length; i++) {
    if (newArr.indexOf(a[i]) === -1) {
      newArr.push(a[i]);
    }
  }
  return newArr;
}

  public loadRecipe() {
    this.http.get<Recipe>(this.baseUrl + 'api/recipes/' + this.id).subscribe(result => {
      this.recipe = result;
    }, error => console.error(error))
  }


  public deleteRecipe(Recipe: Recipe) {
    this.http.delete(this.baseUrl + 'api/recipes/' + Recipe.id).subscribe(result => {
      this.loadRecipes();
      this.router.navigateByUrl("/recipeList")
    }, error => console.error(error))
  }



  public test: boolean;

  loadUsers() {
    this.http.get<User[]>(this.baseUrl + 'api/users').subscribe(result => {
      this.users = result;
      this.test = this.checkLoggedIn()
    }, error => console.error(error));
  }

  checkLoggedIn() {

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].loggedIn == true) {
        return true
      }
    }
    return false
  }


  loadIngredients() {
    this.http.get<Ingredient[]>(this.baseUrl + 'api/ingredients').subscribe(result => {
      this.ingredients = result;
    }, error => console.error(error));
  }

  loadIngredientsData() {
    this.http.get<IngredientData[]>(this.baseUrl + 'api/ingredientDatas').subscribe(result => {
      this.ingredientsData = result;
    }, error => console.error(error));
  }

  public deleteIngredientData(IngredientData: IngredientData) {
    this.http.delete(this.baseUrl + 'api/ingredientDatas/' + IngredientData.id).subscribe(result => {
      this.loadIngredientsData();
    }, error => console.error(error))
  }


  loadRatings() {
    this.http.get<Rating[]>(this.baseUrl + 'api/ratings').subscribe(result => {
      this.ratings = result;
    }, error => console.error(error));
  }

  public deleteRating(Rating: Rating) {
    this.http.delete(this.baseUrl + 'api/ratings/' + Rating.id).subscribe(result => {
      this.loadIngredients();
      window.location.reload();
    }, error => console.error(error))
  } 

  public rating: Rating = <Rating>{};
  public saveRating() {
    let user = this.getLoggedInUser();

    this.rating.recipeID = this.id;
    this.rating.userID = user;
    this.rating.ratingNr = this.selectedValue;
    this.http.post(this.baseUrl + 'api/ratings', this.rating).subscribe(result => {
      window.location.reload();
    }, error => console.error(error));
  }


  loadComments() {
    this.http.get<CommentTable[]>(this.baseUrl + 'api/commentTables').subscribe(result => {
      this.commentTables = result;
      this.dataSourceComment = new MatTableDataSource(result);
      this.dataSourceComment.sort = this.sort;
    }, error => console.error(error));
  }

  public commentTableCreate: CommentTable = <CommentTable>{};
  public saveCommentTable() {
    let currentTime = new Date();
    let user = this.getLoggedInUser();
    this.commentTableCreate.recipeID = this.id;
    this.commentTableCreate.userID = user;
    this.commentTableCreate.sentDate = currentTime;
    this.http.post(this.baseUrl + 'api/commentTables', this.commentTableCreate).subscribe(result => {
      window.location.reload();
    }, error => console.error(error));
  }




  public getLoggedInUser() {

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].loggedIn == true) {
        return this.users[i].id
      }
    }
  }

  public deleteComment(CommentTable: CommentTable) {
    this.http.delete(this.baseUrl + 'api/commentTables/' + CommentTable.id).subscribe(result => {
      this.loadComments();
    }, error => console.error(error))
  }

  public testUserRating() {
    let found = false;
    if (!this.ratings) {
      return false;
    }

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].loggedIn == true) {
        for (let j = 0; j < this.ratings.length; j++) {
          if (this.users[i].id == this.ratings[j].userID) {
            if (this.id == this.ratings[j].recipeID) {
              found = true;
              return found;
            }
          }
        }
      }
    }
    return found;
  }


  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue = 0;
  countStar(star) {
    this.selectedValue = star;
    this.saveRating();
  }



 
    public newMsgTable: CommentTable[];
  public sortVar() {
    if (!this.commentTables) {
      return true
    }
    this.newMsgTable = this.commentTables;
    for (let i = 0; i < this.newMsgTable.length - 1; i++) {
      let date = new Date(this.newMsgTable[i].sentDate)
      let date2 = new Date(this.newMsgTable[i + 1].sentDate)
      if (date.getTime() < date2.getTime()) {
          let aux = this.newMsgTable[i];
          this.newMsgTable[i] = this.newMsgTable[i + 1];
          this.newMsgTable[i + 1] = aux
      }
    }
    return true
  }


  public saveIngredientData() {
    this.ingredientData.recipeID = this.id;
    this.http.post(this.baseUrl + 'api/ingredientDatas', this.ingredientData).subscribe(result => {
      window.location.reload();
    }, error => console.error(error));
  }

 

}

