import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Recipe, User, Rating, Ingredient, IngredientData, CommentTable } from './recipe.models.component'
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['StyleSheet.css'],

})
export class RecipeComponent {
  dataSource: MatTableDataSource<Recipe>;
  @ViewChild(MatSort) sort: MatSort;

  public recipes: Recipe[];
  public users: User[];
  public ratings: Rating[];
  public ingredients: Ingredient[];
  public ingredientsData: IngredientData[];
  public commentTables: CommentTable[];
  displayedColumnsRecipes: string[] = ['imageLink', 'recipeName', 'authorId', 'recipeSummary', 'recipeDetails', 'cookingTime', 'recipeRatingAverage', 'actions'];
  displayedColumnsUsers: string[] = ['id', 'name', 'userName', 'mail', 'password', 'loggedIn','actions'];
  displayedColumnsRatings: string[] = ['ratingNr', 'userID', 'recipeID','actions'];
  displayedColumnsIngredients: string[] = ['id', 'name', 'details', 'actions'];
  displayedColumnsIngredientsData: string[] = ['id', 'recipeID', 'ingredientID','quantity', 'actions'];
  displayedColumnsComments: string[] = ['id', 'msg', 'recipeID', 'userID','actions'];
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.loadRecipes();
    this.loadUsers();
    this.loadRatings();
    this.loadIngredients();
    this.loadIngredientsData();
    this.loadComments();
  }

  loadRecipes() {
    this.http.get<Recipe[]>(this.baseUrl + 'api/recipes').subscribe(result => {
      this.recipes = result;
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.sort = this.sort;
    }, error => console.error(error));
  }

  loadUsers() {
    this.http.get<User[]>(this.baseUrl + 'api/users').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }

  loadRatings() {
    this.http.get<Rating[]>(this.baseUrl + 'api/ratings').subscribe(result => {
      this.ratings = result;
    }, error => console.error(error));
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

  loadComments() {
    this.http.get<CommentTable[]>(this.baseUrl + 'api/commentTables').subscribe(result => {
      this.commentTables = result;
    }, error => console.error(error));
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
 

  public deleteRecipe(Recipe: Recipe) {
    this.http.delete(this.baseUrl + 'api/recipes/' + Recipe.id).subscribe(result => {
      this.loadRecipes();
    }, error => console.error(error))
  }


  public deleteUser(User: User) {
    this.http.delete(this.baseUrl + 'api/users/' + User.id).subscribe(result => {
      this.loadUsers();
    }, error => console.error(error))
  }

  public deleteIngredient(Ingredient: Ingredient) {
    this.http.delete(this.baseUrl + 'api/ingredients/' + Ingredient.id).subscribe(result => {
      this.loadIngredients();
    }, error => console.error(error))
  }

  public deleteRating(Rating: Rating) {
    this.http.delete(this.baseUrl + 'api/ratings/' + Rating.id).subscribe(result => {
      this.loadIngredients();
    }, error => console.error(error))
  } 

  public deleteIngredientData(IngredientData: IngredientData) {
    this.http.delete(this.baseUrl + 'api/ingredientDatas/' + IngredientData.id).subscribe(result => {
      this.loadIngredientsData();
    }, error => console.error(error))
  }

  public deleteComment(CommentTable: CommentTable) {
    this.http.delete(this.baseUrl + 'api/commentTables/' + CommentTable.id).subscribe(result => {
      this.loadComments();
    }, error => console.error(error))
  } 
}


