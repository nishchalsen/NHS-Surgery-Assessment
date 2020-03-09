import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AlertController} from '@ionic/angular'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm:FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public alert: AlertController,
    private router : Router) {}


  ngOnInit() {
    this.loginForm = this.fb.group({
      NHSno : ['', Validators.required],
      lastname : ['', Validators.required]
    })
  }

  login() {
    if (this.loginForm.invalid) {
      this.displayAlert("Enter your login detail", "Please enter your NHS number and last name.")
      return;
    }

    this.authService.login(this.loginForm.value)
    .subscribe(
      data => {
        this.authService.setStorage(data.token)
      },
      err => {
        if (err.status == 401) {
          this.displayAlert("Login Failed", "Please try again")
        }
      }
      
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
