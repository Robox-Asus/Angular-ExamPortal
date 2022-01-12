import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) { }

  loginData = {
    username: '',
    password: ''
  }

  ngOnInit(): void {
  }

  public formSubmit() {
    console.log("clicked");

    if (this.loginData.username.trim() == '' || this.loginData.username.trim() == null || this.loginData.password == '' || this.loginData.password == null) {
      this.snack.open("Username is required !!!", "OK", {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }


    // request to server generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {

        //login
        this.login.loginUser(data.token);

        //setting the current user
        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            // redirect : ADMIN: admin-dashboard
            //redirect : NORMAL: normal-dashboard
            console.log(user);

            if (this.login.getUserRole() == "Admin") {
              // window.location.href = '/admin-dashboard';
              this.router.navigate([`admin-dashboard`]);
              this.login.loginStatusSubject.next(true);
            } else if (this.login.getUserRole() == "Normal") {
              // window.location.href = '/user-dashboard';
              this.router.navigate([`user-dashboard/0`]);
              this.login.loginStatusSubject.next(true);
            } else {
              this.login.logout();
            }
          },
          (error) => {
            this.snack.open("INVALID DETAILS !! Try Again ", '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            })
          }
        );

      }, (error) => {
        console.log("error");
        console.log(error);
      }
    );

  }

}
