import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { ThemePalette } from '@angular/material/core';
import { User } from '../recipe/recipe.models.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}



@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['input.css']
})
export class UserAddComponent  {
  public user: User = <User>{};
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router, private _snackBar: MatSnackBar) {
    this.loadUsers();
    
  }

  public name: string;
  public username: string;
  public mail: string;
  public password: string;


  saveUserInfo() {
    let mailValid
    let nameValid = true;
    if (this.mail) {
      mailValid = this.mail.endsWith("@mail.com");
    }
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].name == this.name) {
        nameValid = false;
      }
    }

    if (!this.name || !nameValid) {
      this._snackBar.open("Invalid name!", "close");
    }
    else if (!this.username) {
      this._snackBar.open("Invalid username!", "close");
    }
    else if (!this.mail || !mailValid) {
      this._snackBar.open("Invalid mail!", "close");
    }
    else if (!this.password) {
      this._snackBar.open("Invalid password!", "close");
    } else {
      this.saveUser()
    }

  }

  public saveUser() {
    this.logOutUsers();
    this.user.name = this.name;
    this.user.username = this.username;
    this.user.mail = this.mail;
    this.user.password = this.password;
    this.user.loggedIn = true;
    this.http.post(this.baseUrl + 'api/users', this.user).subscribe(result => {
      this.router.navigateByUrl("/recipeList")
    }, error => console.error(error));
  }


  public users: User[];
  loadUsers() {
    this.http.get<User[]>(this.baseUrl + 'api/users').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }

  allUserID: User;
  logOutUsers() {
    for (let i = 0; i < this.users.length; i++) {
      this.allUserID = this.users[i];
      this.updateUserTest(this.allUserID, false);
      console.log(this.users[i].id);
    }
  }

  public updateUserTest(userID, log) {
    userID.loggedIn = log;
    this.http.put<User>(this.baseUrl + 'api/users/' + userID.id, userID).subscribe(result => {
    }, error => console.error(error))
  }



}

