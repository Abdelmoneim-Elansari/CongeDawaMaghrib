import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobaleConstants } from 'src/app/shared/global-constante';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:any = UntypedFormGroup;
  responseMessage:any
 
  constructor(
    private userService : UserService,
    private snackbarservice:SnackbarService,
    private dialogRef:MatDialogRef<LoginComponent>,
    private fb:FormBuilder,
    private router:Router){}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null,Validators.required,Validators.pattern(GlobaleConstants.emailRegex)],
      password: [null,Validators.required]
    })
  }

  login(){
    const dataForm = this.loginForm.value;
    const data = {
      email : dataForm.email,
      password : dataForm.password
    }

    this.userService.login(data).subscribe({next: (response:any) => {
      //  console.log(response);
      this.responseMessage = "Login...";
      this.dialogRef.close();
      localStorage.setItem('token',response.token);
      this.router.navigate(['/employes']);
    },error: (error:any) => {
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobaleConstants.generatError;
      }
      this.snackbarservice.openSnackbar(this.responseMessage,GlobaleConstants.error);
    }})

  }

  
}
