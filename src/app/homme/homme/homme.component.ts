import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/login/login.component';
import { SignupComponent } from 'src/app/signup/signup.component';

@Component({
  selector: 'app-homme',
  templateUrl: './homme.component.html',
  styleUrls: ['./homme.component.css']
})
export class HommeComponent {

  constructor(
    private dialog:MatDialog
  ){}


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
