import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Ingredient } from '../recipe/recipe.models.component';

@Component({
  selector: 'app-ingredient-update',
  templateUrl: './ingredient-update.component.html',
  styleUrls: ['input.css'],

})
export class IngredientUpdateComponent implements OnInit {
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  public id: string;
  public ingredient: Ingredient = <Ingredient>{};
  
  ngOnInit() {
   
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
      this.loadIngredients();
    });

  }

  public loadIngredients() {
    this.http.get<Ingredient>(this.baseUrl + 'api/ingredients/' + this.id).subscribe(result => {
      this.ingredient = result;
    }, error => console.error(error))
  }

  public updateIngredient() {
    this.http.put<Ingredient>(this.baseUrl + 'api/ingredients/' + this.id, this.ingredient).subscribe(result => {
      this.router.navigateByUrl("/recipes")
    }, error => console.error(error))
  }
}
