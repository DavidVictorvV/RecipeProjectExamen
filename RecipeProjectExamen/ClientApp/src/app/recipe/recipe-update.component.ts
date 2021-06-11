import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from './recipe.models.component';

@Component({
  selector: 'app-recipe-update',
  templateUrl: './recipe-update.component.html',
  styleUrls: ['input.css'],

})
export class RecipeUpdateComponent implements OnInit {
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  public id: string;
  public recipe: Recipe = <Recipe>{};
  
  ngOnInit() {
   
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
      this.loadRecipe();
    });

  }

  public loadRecipe() {
    this.http.get<Recipe>(this.baseUrl + 'api/recipes/' + this.id).subscribe(result => {
      this.recipe = result;
    }, error => console.error(error))
  }

  public updateRecipe() {
    this.http.put<Recipe>(this.baseUrl + 'api/recipes/' + this.id, this.recipe).subscribe(result => {
      this.router.navigateByUrl("/recipeList-read/" + this.recipe.id)
    }, error => console.error(error))
  }
}
