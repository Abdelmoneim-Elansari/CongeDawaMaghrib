import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Token } from '@mui/icons-material';
import { response } from 'express';
import jwt_Decode from 'jwt-decode';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobaleConstants } from 'src/app/shared/global-constante';
import { SignupComponent } from 'src/app/signup/signup.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns:String[]= ['name','email','contactNumber','action'];
  datasource:any;
  responseMessage:any;
  notDefin:String='email pas définie';
  token:any = localStorage.getItem('token')
  tokenPayload:any = jwt_Decode(this.token)
  role:String = this.tokenPayload.role
  
  constructor(private userService:UserService,
    private snackbarService:SnackbarService,
    private dialog:MatDialog
  ){}
  ngOnInit(): void {
    this.getAll();

  }

  filterUser(event:Event){
    var filterValue = (event.target as HTMLInputElement).value
    this.datasource.filter = filterValue.trim().toLowerCase()
  }

  getAll(){
    this.userService.getAll().subscribe({next: (response:any) => {
      this.datasource = new MatTableDataSource(response);
      this.responseMessage = "gestion d/'utilisateur";
          console.log(this.datasource)
      this.snackbarService.openSnackbar(this.responseMessage,'');
    },error: (error:any) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message
      }else{
        this.responseMessage = GlobaleConstants.generatError
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobaleConstants.error)
    }
    })
  }

  addUser(){
    var dialogConfig = new MatDialogConfig();
    dialogConfig.width='555px';
    dialogConfig.data = {
      action : 'add'
    }
    this.dialog.open(SignupComponent,dialogConfig)
  }
  

  updateUser(id:any){
    var dialogConfig = new MatDialogConfig();
    dialogConfig.width = '555px';
    dialogConfig.data = {
      id : id,
      action : 'edit'
    }
    this.dialog.open(SignupComponent,dialogConfig)
  }


  updateStatus(checked:any,id:any){
    var data = {
      id : id,
      status : checked
    }
    this.userService.updateSatus(data).subscribe({next : (response:any) => {
      this.responseMessage = response.message;
      this.snackbarService.openSnackbar(this.responseMessage,"");
    },error : (error:any) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message
      }else{
        this.responseMessage = GlobaleConstants.generatError
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobaleConstants.error)
    }
  })
  }

  openSide(){
    var mySideNav = document.getElementById("mysideNav");
       if(mySideNav){
          mySideNav.style.display = "block";
          mySideNav.style.width = ""
       }
    var main = document.getElementById('main');
       if(main){
        main.style.marginRight = "250px"
       }
  }
  deletedUser(id:any){
    this.userService.deleteUser(id).subscribe({next : (response:any) => {
      this.getAll()
      this.responseMessage = response.message;
      this.snackbarService.openSnackbar(this.responseMessage,'')
    },error : (error:any) => {
      if (error?.error.message) {
        this.responseMessage = error?.error.message;
      }else{
        this.responseMessage = GlobaleConstants.generatError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobaleConstants.error)
    }})
  }
}
