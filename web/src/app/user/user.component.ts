import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  u_obj: any = [];
  new_user: string;
  isNewUser:boolean = false;


  constructor(
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit() {
    this.new_user = '';
    this.apiService.get_user()
    .subscribe(
      data => this.u_obj = data,
      err => console.log(err) 
    ); 
  }
  
  addUser(): void {

    this.router.navigate(['/user/add-user'])
    // for some reason this does not work. I will try to fix it later.
  }

  delete(user: any): void {
    this.apiService.remove_user(user)
    .subscribe(
      data => {},
      err => console.log(err)
    );

    this.u_obj.splice(this.u_obj.indexOf(user), 1)
  }


  edit_user(user: any): void {

    this.apiService.edit_user(user)
    .subscribe(
      data => {console.log("done")},
      err => console.log(err)
    );

    var index = this.u_obj.indexOf(user)

    if (this.u_obj[index].userRoleID === 1) {
      this.u_obj[index].userRoleID = 2;
    }
    else {
      this.u_obj[index].userRoleID = 1
    }
    
  }
}


