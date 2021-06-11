import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { Ingredient, Recipe, User } from './recipe.models.component';






@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['InsertCss.css']
})
export class RecipeAddComponent  {
  public recipe: Recipe = <Recipe>{};
  public users: User[];
  public ingredients: Ingredient[];
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
    this.loadUsers();
    this.loadIngredients();
  }



  public saveRecipe() {
    this.recipe.authorId = this.userLogged.id
    this.http.post(this.baseUrl + 'api/recipes', this.recipe).subscribe(result => {
      this.router.navigateByUrl("/recipeList")
    }, error => console.error(error));
  }

  loadUsers() {
    this.http.get<User[]>(this.baseUrl + 'api/users').subscribe(result => {
      this.users = result;
      this.getLoggedIn()
    }, error => console.error(error));
  }
  public userLogged: User;
  getLoggedIn() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].loggedIn == true) {
        this.userLogged = this.users[i]
      }
    }
  }


  loadIngredients() {
    this.http.get<Ingredient[]>(this.baseUrl + 'api/ingredients').subscribe(result => {
      this.ingredients = result;
     
    }, error => console.error(error));
  }



 

 

}

