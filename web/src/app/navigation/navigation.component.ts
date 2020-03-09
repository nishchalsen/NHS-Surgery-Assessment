import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    private apiService: ApiService) { }


  ngOnInit() {

  }

}
