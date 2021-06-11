import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { ThemePalette } from '@angular/material/core';
import { Ingredient } from '../recipe/recipe.models.component';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}



@Component({
  selector: 'app-ingredient-add',
  templateUrl: './ingredient-add.component.html',
  styleUrls: ['InsertCss.css']
})
export class IngredientAddComponent  {
  public ingredient: Ingredient = <Ingredient>{};
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
  }

  public saveIngredient() {
    this.http.post(this.baseUrl + 'api/ingredients', this.ingredient).subscribe(result => {
      this.router.navigateByUrl("/recipes")
    }, error => console.error(error));
  }


}

