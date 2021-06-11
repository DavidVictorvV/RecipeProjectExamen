import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../recipe/recipe.models.component';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['input.css'],

})
export class UserUpdateComponent implements OnInit {
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  public id: string;
  public user: User = <User>{};
  
  ngOnInit() {
   
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
      this.loadUser();
    });

  }

  public loadUser() {
    this.http.get<User>(this.baseUrl + 'api/users/' + this.id).subscribe(result => {
      this.user = result;
    }, error => console.error(error))
  }

  public updateUser() {
    this.http.put<User>(this.baseUrl + 'api/users/' + this.id, this.user).subscribe(result => {
      this.router.navigateByUrl("/recipeList")
    }, error => console.error(error))
  }





}
