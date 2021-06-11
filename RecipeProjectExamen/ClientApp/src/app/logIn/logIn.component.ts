import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { User } from '../recipe/recipe.models.component';
import { Router } from '@angular/router';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-logIn',
  templateUrl: './logIn.component.html',
  styleUrls: ['input.css']

})
export class LogInComponent {
  public logInUsername: string;
  public logInPassword: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
    this.loadUsers();
  }

  public users: User[];
  loadUsers() {
    this.http.get<User[]>(this.baseUrl + 'api/users').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }

  public logInUser: User;

  checkUser() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.logInUsername == this.users[i].name && this.logInPassword == this.users[i].password) {
        this.logInUser = this.users[i]
        this.logOutUsers();
        this.updateUserTest(this.logInUser,true)
      }
    }
  }



allUserID: User;
logOutUsers() {
for (let i = 0; i < this.users.length; i++) {
  this.allUserID = this.users[i];
  this.updateUserTest(this.allUserID,false);
  console.log(this.users[i].id);
}
}

public updateUserTest(userID,log) {
  userID.loggedIn = log;
  this.http.put<User>(this.baseUrl + 'api/users/' + userID.id, userID).subscribe(result => {
    this.router.navigateByUrl("/recipeList")
}, error => console.error(error))
}
}


