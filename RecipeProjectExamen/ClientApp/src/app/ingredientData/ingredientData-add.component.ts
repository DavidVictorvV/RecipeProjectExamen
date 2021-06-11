import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { ThemePalette } from '@angular/material/core';
import { Ingredient, IngredientData } from '../recipe/recipe.models.component';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}



@Component({
  selector: 'app-ingredientData-add',
  templateUrl: './ingredientData-add.component.html',
  styleUrls: ['InsertCss.css']
})
export class IngredientDataAddComponent  {
  public ingredientData: IngredientData = <IngredientData>{};
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
    this.loadIngredients();
  }

  public saveIngredientData() {
    this.http.post(this.baseUrl + 'api/ingredientDatas', this.ingredientData).subscribe(result => {
      this.router.navigateByUrl("/recipes")
    }, error => console.error(error));
  }

  public ingredients: Ingredient[];
  loadIngredients() {
    this.http.get<Ingredient[]>(this.baseUrl + 'api/ingredients').subscribe(result => {
      this.ingredients = result;

    }, error => console.error(error));
  }

}

