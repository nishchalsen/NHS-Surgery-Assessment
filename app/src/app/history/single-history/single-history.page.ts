import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-single-history',
  templateUrl: './single-history.page.html',
  styleUrls: ['./single-history.page.scss'],
})
export class SingleHistoryPage implements OnInit {


  history: any = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.history = this.apiService.currentHistory;
  }



}
