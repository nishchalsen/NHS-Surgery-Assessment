import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  currentDate:number = Date.now();


  constructor(
    private authService: AuthService) { }

  ngOnInit() {
  }
  
  logout(){
    this.authService.logout();
  }

}
