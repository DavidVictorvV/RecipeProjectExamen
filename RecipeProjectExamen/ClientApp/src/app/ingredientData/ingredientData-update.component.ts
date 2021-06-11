import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { IngredientData } from '../recipe/recipe.models.component';

@Component({
  selector: 'app-ingredientData-update',
  templateUrl: './ingredientData-update.component.html',
  styleUrls: ['input.css'],

})
export class IngredientDataUpdateComponent implements OnInit {
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  public id: string;
  public ingredientData: IngredientData = <IngredientData>{};
  
  ngOnInit() {
   
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
      this.loadIngredients();
    });

  }

  public loadIngredients() {
    this.http.get<IngredientData>(this.baseUrl + 'api/ingredientDatas/' + this.id).subscribe(result => {
      this.ingredientData = result;
    }, error => console.error(error))
  }

  public updateIngredientData() {
    this.http.put<IngredientData>(this.baseUrl + 'api/ingredientDatas/' + this.id, this.ingredientData).subscribe(result => {
      this.router.navigateByUrl("/recipes")
    }, error => console.error(error))
  }
}
