import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  [x: string]: any;

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  //generate user
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // login user : set token in local storage
  loginUser(token: string) {
    localStorage.setItem("token", `${token}`);
    return true;
  }

  //isLogin : user is logged in or not
  public isLoggedIn() {
    let token = localStorage.getItem("token");
    if (token == undefined || token == '' || token == null)
      return false;
    else
      return true;
  }

  //logout : remove token from local storage
  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  // getToken
  public getToken() {
    return localStorage.getItem("token");
  }

  // set userDetails
  public setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  // getUser
  public getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  //get user role
  public getUserRole() {
    let user = this.getUser().authorities[0].authority;
    return user;
  }

}
