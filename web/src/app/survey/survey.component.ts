import { Component, OnInit} from '@angular/core';
import { ApiService } from '../services/api.service';

// interface ControlValueAccessor {  
//   writeValue(obj: any): void
//   registerOnChange(fn: any): void
//   registerOnTouched(fn: any): void
//   setDisabledState(isDisabled: boolean): void
// }

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})

export class SurveyComponent implements OnInit {

  q_obj: any = [];
  input_question: string;
  input_ID: number;
  
  constructor(private apiService: ApiService) { }

  ngOnInit() {    
    this.input_question = '';
    this.input_ID = null;
    this.apiService.getQuestionApi()
    .subscribe(
      data => this.q_obj = data,
      err => console.log(err));    
  }
  

onChange: any = () => { };
registerOnChange(fn) {
  this.onChange = (obj) => fn(obj);
}

  async addQuestion(): Promise<void> {

    var count = this.q_obj.length;
    console.log("length of q_obj is", this.q_obj.length);
    console.log("this.input_ID",this.input_ID);
    for (var i = count - 1; i >= 0; i--){
      console.log("this.q_obj[i].questionID for",i,"is",this.q_obj[i].questionID);
      if (this.q_obj[i].questionID == this.input_ID) {
        console.log("found a match to delete: i",i,"q_obj[i]",this.q_obj[i]);
      await this.apiService.deleteQuestionApi(this.input_ID)
      .toPromise().then(
        data => this.q_obj.splice(i,1),
        err => console.log(err))
      }
    }

    this.apiService.addQuestionDbApi({
      parentQuestion: 0,
      question: this.input_question,  
      questionID: this.input_ID,
      pos: 0,
      type: 1,
    })
    // console.log("maximum pos is ",findmax('pos'))
    .subscribe(
     data => {this.q_obj.push(data)},
     error =>{console.log('error during post is ', error)
    }
    );

  }

  delete(question: any): void {
    console.log(this.q_obj.indexOf(question))
    this.apiService.deleteQuestionApi(question.questionID)
    .subscribe(
      data => this.q_obj.splice(this.q_obj.indexOf(question), 1),
      err => console.log(err))
  }

  edit(question: any): void {
    // this.onChange(this.value);
    this.input_ID = question.questionID

    this.input_question = question.question

    console.log(question.pos);
  }

  moveup(question: any): void {
    question.pos -= 1
    console.log(question.pos)
  }

  movedown(question: any): void {
    question.pos += 1
    console.log(question.pos)
  }

  toggletype(question: any): void {
    question.type == 'yes/no' ? question.type = 'free text' : question.type = 'yes/no', 
    console.log(question.type)
  }
  
  filterBy(prop: string) {
    return this.q_obj.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

}

