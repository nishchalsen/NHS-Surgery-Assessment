import { Component, OnInit } from '@angular/core';
import { Chart} from 'chart.js';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-surveyresults',
    templateUrl: './surveyresults.component.html',
    styleUrls: ['./surveyresults.component.scss']
})

export class SurveyresultsComponent implements OnInit {
  survey_obj: any = [];

    constructor(private apiService: ApiService) { }
  
    async ngOnInit() {

    }

    async loadData() {

      this.survey_obj = await this.apiService.getAssessmentApi().toPromise();
      // console.log('this.feedback_obj',this.feedback_obj)

    }


    
      async ngAfterViewInit() {

        await this.loadData()

        function delay(ms: number) {
          return new Promise( resolve => setTimeout(resolve, ms) );
      }
      await delay(300);
       
        var i = 0
        for (i = 0; i < this.survey_obj.length; i++) {
          console.log("i is ",i)
          console.log("survey_obj is",this.survey_obj)
 
            var chart = new Chart(document.getElementById("surveyContainer" + i), {
            type: "pie",
            fontSize: 15,
            data: {
              labels: ["Yes","No"],
              datasets: [
                {
                  label: "Respondent Yes/No's",
                  fontSize: 10,
                  data: [
                    this.survey_obj[i].yes,
                    this.survey_obj[i].no,
                  ],
                  backgroundColor: [
                    'rgba(  0, 255,   0, 0.4)',
                    'rgba(255,   0,   0, 0.4)',

                    ],
                  borderColor: [
                    'rgba(  0, 255,   0, 1)',
                    'rgba(255,   0,   0, 1)',

                    ],
                  borderWidth: 1,
                }
              ]
            },
            options: {
              tooltips: {
                titleFontSize: 15,
                bodyFontSize: 15 },

              legend: { display: false },
              title: {
                display: true,
                text: this.survey_obj[i].question,
                fontSize: 20
              }
            }
          });
        
        }
      
      }
  
    }