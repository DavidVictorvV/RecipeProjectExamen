import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Recipe, Rating, User } from '../recipe/recipe.models.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipeList',
  templateUrl: './recipeList.component.html',
  styleUrls: ['button-overview-example.css','editButtonStyle.css'],
})
export class RecipeListComponent {
  public recipes: Recipe[];
  public ratings: Rating[];
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
    this.loadRecipes();
    this.loadRatings();
    this.loadUsers();
  }


  public test: boolean;
  public users: User[];
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
  counter(i: number) {
    return new Array(Number(i));
  }

  loadRecipes() {
    this.http.get<Recipe[]>(this.baseUrl + 'api/recipes').subscribe(result => {
      this.recipes = result;

    }, error => console.error(error));
  }


  loadRatings() {
    this.http.get<Rating[]>(this.baseUrl + 'api/ratings').subscribe(result => {
      this.ratings = result;
    }, error => console.error(error));
  }


  
  }

 


