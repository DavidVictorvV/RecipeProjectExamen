import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { ThemePalette } from '@angular/material/core';
import { Rating } from '../recipe/recipe.models.component';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}



@Component({
  selector: 'app-rating-add',
  templateUrl: './rating-add.component.html',
  styleUrls: ['InsertCss.css']
})
export class RatingAddComponent  {
  public rating: Rating = <Rating>{};
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
  }

  public saveRating() {
    this.http.post(this.baseUrl + 'api/ratings', this.rating).subscribe(result => {
      this.router.navigateByUrl("/recipes")
    }, error => console.error(error));
  }


}

