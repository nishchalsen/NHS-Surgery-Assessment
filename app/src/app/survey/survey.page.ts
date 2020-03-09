import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
  providers: [DatePipe]
})
export class SurveyPage implements OnInit {

  all_question: any;
  currentTime: number = Date.now();



    
  constructor(
    private apiService: ApiService,
    private alert: AlertController,
    private datePipe: DatePipe) {  }

  

  ngOnInit() {
    this.apiService.getQuestions()
    .subscribe(
      (data) => this.all_question = data,
      (err) => console.log(err)
    )

    
  }
  
  yes(pos: number) {
    this.all_question[pos].answers = "yes"; 
  }

  no(pos: number) {
    this.all_question[pos].answers = "no"; 
  }

  submit() {
    
    for (let q of this.all_question) {

      if (!q.answers && q.type === "yes/no") {
        this.displayAlert("Please complete the survey", "Please answer all the question.");
        return;
      }
    }
    
    this.apiService.addSuvery({startTime: this.datePipe.transform(this.currentTime, 'yyyy-MM-dd, HH:mm:ss'), data: this.all_question})
    .subscribe(
      data => this.displayAlert("Success", "Thank you for filling in the survey."),
      err => this.displayAlert("Something went wrong.", "Please try again later.")
    )
    
  } 


  async displayAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    })

    await alert.present()

  }

}
