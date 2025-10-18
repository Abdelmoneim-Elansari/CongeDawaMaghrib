import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.css']
})
export class FullComponent implements OnInit {

  public pageName:string=''

  constructor(private router:Router,
  ){}
  ngOnInit(): void {
    console.log(window.location.pathname)
    this.pageName = window.location.pathname
  }

  /*routeToUser(){
    if (this.pageName =='employes') {
      this.router.navigate(['/full/employes'])
      this.pageName = 'user'
    }else if(this.pageName = 'user'){
     this.router.navigate(['/full/user'])
     this.pageName = 'employes'
    }
  }*/
  routeToEmploye(){
      this.router.navigate(['/full/employes'])
      this.pageName = '/full/employes'
  }
  routeToUser(){
      this.router.navigate(['/full/user'])
      this.pageName = '/full/user'
  }
  lignout(){
    this.router.navigate(['/']);
    localStorage.clear();
  }
}
