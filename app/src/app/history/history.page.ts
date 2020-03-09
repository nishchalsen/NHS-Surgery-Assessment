import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  allHistory: any;

  constructor(
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.patientHistory()
  }

  patientHistory() {
    this.apiService.getHistory()
    .subscribe(
      data => this.allHistory = data,
      err => console.log(err)
    )
  }

  viewHistory(history: object) {
    this.apiService.setCurrentHistory(history)
    this.router.navigate(['/tabs/single-history'])

  }

}
