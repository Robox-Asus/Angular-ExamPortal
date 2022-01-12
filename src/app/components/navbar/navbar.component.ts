import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isActive = false;
  user:any = null;

  constructor(public login: LoginService,private router:Router) { }

  ngOnInit(): void {
    this.isActive = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isActive = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
  }

  public loggedOut() {
    this.login.logout();
    window.location.reload();
  }

  redirect() {
    if(this.login.getUserRole() == "Admin") {
      this.router.navigate(['admin-dashboard']);
    }
    else if(this.login.getUserRole() == "Normal") {
      this.router.navigate(['user-dashboard/0']);
    }
  }

}
