import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  canActivate(): boolean {
    if (this.apiService.isLoggedIn()) {
      return true;     
    } else {
      this.router.navigate(['/login'])
      return false;
    }
  }
}
