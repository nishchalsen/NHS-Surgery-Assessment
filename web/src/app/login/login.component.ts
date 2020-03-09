import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalid:string = "";
  submitted: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService) {
      
      if(this.apiService.isLoggedIn) {
        this.router.navigate(['home']);
      }
     }
    
  
  ngOnInit() {

    this.loginForm = this.fb.group({
      username : ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  public login() {

    this.submitted = true;
    
    if (this.loginForm.invalid) {
      return;
    }

    this.apiService.login(this.loginForm.value)
    .subscribe(
      data => {
        localStorage.setItem('token', data.token),
        this.router.navigate(['/home'])
      },
      err => this.invalid = err.message
    )
    
  }

}
