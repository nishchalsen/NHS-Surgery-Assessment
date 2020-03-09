import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private loginUrl: string = 'http://localhost:3000/login';
  // private registerUrl: string = 'http://localhost:3000/register';
  // private removeUserUrl: string = 'http://localhost:3000/remove_user';
  // private editUserUrl: string = 'http://localhost:3000/edit_user';
  // private getUserUrl: string = 'http://localhost:3000/get_user';
  // private patientUrl: string = 'http://localhost:3000/get_patient';

  // private getapiUrl: string = 'http://localhost:3000/questions';
  // private addapiUrl: string = 'http://localhost:3000/add_question';
  // private deleteUrl: string = 'http://localhost:3000/delete_question';
  // private feedbackUrl: string = 'http://localhost:3000/feedback_response'
  // private assessmentUrl: string = 'http://localhost:3000/assessment_ans'

  private loginUrl: string = 'http://poac.uksouth.cloudapp.azure.com:3000/login';
  private registerUrl: string = 'http://poac.uksouth.cloudapp.azure.com:3000/register';
  private removeUserUrl: string = 'http://poac.uksouth.cloudapp.azure.com:3000/remove_user';
  private editUserUrl: string = 'http://poac.uksouth.cloudapp.azure.com:3000/edit_user';
  private getUserUrl: string = 'http://poac.uksouth.cloudapp.azure.com:3000/get_user';
  private patientUrl: string = 'http://poac.uksouth.cloudapp.azure.com:3000/get_patient';

  private getapiUrl: string = 'http://poac.uksouth.cloudapp.azure.com:3000/questions';
  private addapiUrl: string = 'http://poac.uksouth.cloudapp.azure.com:3000/add_question';
  private deleteUrl: string = 'http://poac.uksouth.cloudapp.azure.com:3000/delete_question';
  private feedbackUrl: string = 'http://poac.uksouth.cloudapp.azure.com:3000/feedback_response'
  private assessmentUrl: string = 'http://poac.uksouth.cloudapp.azure.com:3000/assessment_ans'

  constructor(
    private http: HttpClient,
    private router: Router) { }


  getPatientInfo(user: object) {
    return this.http.post(this.patientUrl, user)
  }

  getQuestionApi() {
    return this.http.get(this.getapiUrl);
  }

  getFeedbackApi() {
    return this.http.get(this.feedbackUrl);
  }

  getAssessmentApi() {
    return this.http.get(this.assessmentUrl);
  }

  addQuestionDbApi(obj: object) {
    return this.http.post(this.addapiUrl, obj);
  }

  deleteQuestionApi(id: number) {
    return this.http.get(`${this.deleteUrl}${id}`);
  }

  // deleteQuestionApi(obj: object) {
  //   return this.http.post(`${this.deleteUrl}`);
  // }

  get_user() {
    return this.http.get(this.getUserUrl)
  }

  login(user: object) {
    return this.http.post<any>(this.loginUrl, user);
  }

  register(user: object) {
    return this.http.post(this.registerUrl, user);
  }

  remove_user(user: object) {
    return this.http.post(this.removeUserUrl, user);
  }

  edit_user(user: object) {
    return this.http.post(this.editUserUrl, user);
  }


  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

  isAdmin() {
    const helper = new JwtHelperService()
    const decodedToken = helper.decodeToken(localStorage.getItem('token'));
    
    if (decodedToken.userRoleID === 1) {
      return true;
    } else {
      return false;
    }
  }
  
  isLoggedIn() : boolean {
    return !!localStorage.getItem('token');
  
  }
  
  isHome(): boolean {
    return window.location.pathname === "/home"

  }
  getToken() {
    return localStorage.getItem('token');
  }
}
