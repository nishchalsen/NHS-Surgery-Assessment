import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  firstname:string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    const helper = new JwtHelperService()
    const decodedToken = helper.decodeToken(localStorage.getItem('token'));
    this.firstname = decodedToken.firstname

  }

}
