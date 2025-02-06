import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GlobaleConstants } from '../shared/global-constante';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm:any;
  responseMessage:any;

  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private dialogRef:MatDialogRef<SignupComponent>,
    private snackbarService:SnackbarService
  ){}
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name : [null,Validators.required,Validators.pattern(GlobaleConstants.nameRegex)],
      contactNumber : [null,Validators.required,Validators.pattern(GlobaleConstants.contactNumberRegex)],
      email : [null,Validators.required,Validators.pattern(GlobaleConstants.emailRegex)],
      password : [null,Validators.required],
      confirmPassword : [null,Validators.required]
    })
  }

  handelSubmit(){
    var dataForm = this.signUpForm.value;

    var data = {
      name : dataForm.name,
      contactNumber : dataForm.contactNumber,
      email : dataForm.email,
      password : dataForm.password,
      confirmPassword : dataForm.confirmPassword,
      status : "false",
      role : "admin"
    }

    this.userService.signUp(data).subscribe({next: (response:any) => {
      this.responseMessage = response.message;
      this.dialogRef.close;
      this.snackbarService.openSnackbar(this.responseMessage,'')
    },error: (err) => {
      if (err.error?.message) {
        this.responseMessage = err.error?.message;
      }else{
        this.responseMessage = GlobaleConstants.generatError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobaleConstants.error);
    }})
  }

  comparPassword(){
    var dataForm = this.signUpForm.value
    return dataForm.password === dataForm.confirmPassword
  }


}
