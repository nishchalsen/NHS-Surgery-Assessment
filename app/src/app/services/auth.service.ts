import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private loginURL = 'http://localhost:3000/app/login'
  private loginURL = 'http://poac.uksouth.cloudapp.azure.com:3000/app/login'
  authenticationState = new BehaviorSubject(false);



  constructor(
    private http: HttpClient,
    private plt: Platform,
    private router: Router) { }

  login(user: object) {
    return this.http.post<any>(this.loginURL, user)
  }

  setStorage(token:string): void {
    localStorage.setItem("token",token)
    this.authenticationState.next(true);
  }


  logout() {

    localStorage.removeItem("token");
    this.authenticationState.next(false);
  }

  isAuth() {
    return this.authenticationState.value;
  }
}
