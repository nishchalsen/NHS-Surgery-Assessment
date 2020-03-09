import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  currentHistory: any = [];

  // private questionUrl = 'http://localhost:3000/questions';
  // private feedbackQuesUrl = 'http://localhost:3000/app/feedback_ques';
  // private addFeedbackUrl = 'http://localhost:3000/app/add_feedback';
  // private userInfoURL = 'http://localhost:3000/app/patient_info';
  // private patientHistoryUrl = 'http://localhost:3000/app/patient_history';
  // private addSurveyUrl = 'http://localhost:3000/app/new_survey';

  private questionUrl = 'http://poac.uksouth.cloudapp.azure.com:3000/questions';
  private feedbackQuesUrl = 'http://poac.uksouth.cloudapp.azure.com:3000/app/feedback_ques';
  private addFeedbackUrl = 'http://poac.uksouth.cloudapp.azure.com:3000/app/add_feedback';
  private userInfoURL = 'http://poac.uksouth.cloudapp.azure.com:3000/app/patient_info';
  private patientHistoryUrl = 'http://poac.uksouth.cloudapp.azure.com:3000/app/patient_history';
  private addSurveyUrl = 'http://poac.uksouth.cloudapp.azure.com:3000/app/new_survey';

  constructor(private http: HttpClient) { }

  setCurrentHistory(history) {
    this.currentHistory = history;
  }

  getHistory() {
    return this.http.get<any>(this.patientHistoryUrl);
  }

  getQuestions() {
    return this.http.get<any>(this.questionUrl);
  }

  getFeedbackQues() {
    return this.http.get<any>(this.feedbackQuesUrl);
  }

  postAddFeedback(obj: object) {
    return this.http.post<any>(this.addFeedbackUrl, obj);
  }

  addSuvery(obj: object) {
    return this.http.post<any>(this.addSurveyUrl, obj);
  }
  getUser() {
    return this.http.get(this.userInfoURL);
  }



}
