import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import { GlobaleConstants } from '../shared/global-constante';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(private router:Router,
    private auth:AuthService,
    private snackbarService:SnackbarService
  ) { }
  canActivate(route:ActivatedRouteSnapshot):boolean{
    
    const token:any = localStorage.getItem('token');
    var tokenPayload:any;
    try{
      tokenPayload = jwt_decode(token)
      console.log(tokenPayload)
    }catch(err){
      localStorage.clear()
      this.router.navigate(['/'])
    }

    let expectedRoleArry = route.data;
    expectedRoleArry = expectedRoleArry['expectedRole'];

    let checkRole = false;
    for (let i = 0; i < expectedRoleArry['length']; i++) {
      if(tokenPayload.role === expectedRoleArry[i]){
        checkRole = true
      }
    }
    if(tokenPayload.role == 'user' || tokenPayload.role == 'admin'){
    if(this.auth.isAuthenticated() && checkRole){
        return true
    }
    this.router.navigate(['/employes'])
    this.snackbarService.openSnackbar(GlobaleConstants.unAuthorized,GlobaleConstants.error)
    return false
    }else{
    this.router.navigate(['/'])
    localStorage.clear(); 
    return false
    }

  }
  
}
