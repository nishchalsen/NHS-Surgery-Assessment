import { Component, OnInit } from '@angular/core';
import { Chart} from 'chart.js';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})

export class FeedbackComponent implements OnInit {
  feedback_obj: any = [];

    constructor(private apiService: ApiService) { }
  
    async ngOnInit() {

    }

    async loadData() {

      this.feedback_obj = await this.apiService.getFeedbackApi().toPromise();

    }


    async ngAfterViewInit() {

      await this.loadData()

      console.log('feedback_obj length is', this.feedback_obj.length),
      console.log(this.feedback_obj)

      function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
    await delay(300);
     
      var i = 0
      for (i = 0; i < this.feedback_obj.length; i++) {

          var chart = new Chart(document.getElementById("chartContainer" + i), {
          // console.log("inside chart")
          type: "bar",
          fontSize: 15,
          data: {
            labels: ["S. Disagree", "Disagree", "Neither", "Agree", "S. Agree"],
            datasets: [
              {
                label: "# of Respondent(s)",
                fontSize: 10,
                data: [
                  this.feedback_obj[i].A1,
                  this.feedback_obj[i].A2,
                  this.feedback_obj[i].A3,
                  this.feedback_obj[i].A4,
                  this.feedback_obj[i].A5,
                  // console.log(this.feedback_obj[i].A5)
                ],
                backgroundColor: [
                  'rgba(255,   0,   0, 0.4)',
                  'rgba(255, 165,   0, 0.4)',
                  'rgba(255, 255,   0, 0.4)',
                  'rgba(  0, 255, 255, 0.4)',
                  'rgba(  0, 255,   0, 0.4)'
                  ],
                borderColor: [
                  'rgba(255,   0,   0, 1)',
                  'rgba(255, 165,   0, 1)',
                  'rgba(255, 255,   0, 1)',
                  'rgba(  0, 255, 255, 1)',
                  'rgba(  0, 255,   0, 1)'
                  ],
                borderWidth: 1,
              }
            ]
          },
          options: {
            tooltips: {
              titleFontSize: 15,
              bodyFontSize: 15 },
            scales: {
              xAxes: [{
                  ticks: {
                      fontSize: 12,
                      fontStyle: "bold"
                  }
              }],
              yAxes: [{
                ticks: {
                    fontSize: 15,
                    beginAtZero: true,
                    callback: function(value) {if (value % 1 === 0) {return value;}}
                }
            }]
          },
            legend: { display: false },
            title: {
              display: true,
              text: this.feedback_obj[i].Title,
              fontSize: 20
            }
          }
        });
      
      }
    
    }

  }