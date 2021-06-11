import { Component } from '@angular/core';
import { User } from '../recipe/recipe.models.component';
import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
    this.loadUsers();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public test: boolean;
  public users: User[];
  loadUsers() {
    this.http.get<User[]>(this.baseUrl + 'api/users').subscribe(result => {
      this.users = result;
      this.test = this.checkLoggedIn()
    }, error => console.error(error));
  }
  loggedInUser: User;

  checkLoggedIn() {
    
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].loggedIn == true) {
        this.loggedInUser = this.users[i]
        return true
      }
    }
    return false
  }


  allUserID: User;
  logOut() {
    for (let i = 0; i < this.users.length; i++) {
      this.allUserID = this.users[i];
      this.updateUserTest(this.allUserID, false);
      window.location.reload();
    }
  }

  public updateUserTest(userID, log) {
    userID.loggedIn = log;
    this.http.put<User>(this.baseUrl + 'api/users/' + userID.id, userID).subscribe(result => {
    }, error => console.error(error))
  }

}
