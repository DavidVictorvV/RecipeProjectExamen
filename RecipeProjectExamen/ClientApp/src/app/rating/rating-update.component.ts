import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Rating } from '../recipe/recipe.models.component';

@Component({
  selector: 'app-rating-update',
  templateUrl: './rating-update.component.html',
  styleUrls: ['input.css'],

})
export class RatingUpdateComponent implements OnInit {
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  public id: string;
  public rating: Rating = <Rating>{};
  
  ngOnInit() {
   
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
      this.loadRatings();
    });

  }

  public loadRatings() {
    this.http.get<Rating>(this.baseUrl + 'api/ratings/' + this.id).subscribe(result => {
      this.rating = result;
    }, error => console.error(error))
  }
  

  public updateRating() {
    this.http.put<Rating>(this.baseUrl + 'api/ratings/' + this.id, this.rating).subscribe(result => {
      this.router.navigateByUrl("/recipes")
    }, error => console.error(error))
  }
}
