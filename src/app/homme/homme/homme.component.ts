import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/login/login.component';
import { SignupComponent } from 'src/app/signup/signup.component';

@Component({
  selector: 'app-homme',
  templateUrl: './homme.component.html',
  styleUrls: ['./homme.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class HommeComponent implements OnInit {

  constructor(
    private dialog:MatDialog
  ){}
  ngOnInit(): void {
   /* let container = document.querySelector('.container') as HTMLElement
    document.addEventListener('DOMContentLoaded',() => {  
         for (let j = 0; j < 4; j++) {
            let loader = document.createElement('div');
            loader.classList.add('loader');
            loader.style.setProperty('--j',j.toString());
              for (let i = 0; i < 20; i++) {          
                    let span = document.createElement('span');
                    span.style.setProperty('--i',i.toString())
                    loader.appendChild(span);
                }
                container.appendChild(loader)               
        }
    })*/
  }

  

  dialogLogin(){
    const matdilogConfig = new MatDialogConfig()
    matdilogConfig.width = "555px";
    this.dialog.open(LoginComponent,matdilogConfig)
  }

  dialogSignup(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '555px';
    this.dialog.open(SignupComponent,dialogConfig)
  }
  

}
