import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GestionDeCongesService } from 'src/app/services/gestion-de-conges.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobaleConstants } from 'src/app/shared/global-constante';


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {
  responseMessage:any;
  dataAction:string = 'add';
  action:string = 'add';
  imagName:any = 'image';

  employeForm:any = UntypedFormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any ,
    private fb:FormBuilder,
    private gestionGongeService:GestionDeCongesService,
    private snackbarService:SnackbarService,
    private dialogRef:MatDialogRef<GestionComponent>,
  ){

  }
  ngOnInit(): void {
       this.employeForm = this.fb.group({
        firstName : ['',[Validators.required,Validators.pattern(GlobaleConstants.nameRegex)]],
        lastName : ['',[Validators.required,Validators.pattern(GlobaleConstants.nameRegex)]],
        contactNumber: ['',[Validators.required,Validators.pattern(GlobaleConstants.contactNumberRegex)]],
        email: ['',[Validators.required,Validators.pattern(GlobaleConstants.emailRegex)]],
        service: ['',[Validators.required]],
        poste: ['',[Validators.required]],
        TimeInscript: ['',[Validators.required]],
       });
       var employe = this.dialogData.data;
       if (this.dialogData.action === "edit") {
        this.dataAction === "edit";
        this.action = "edit";
        this.employeForm.setValue({
        firstName: [employe.firstName,Validators.required,Validators.pattern(GlobaleConstants.nameRegex)],
        lastName: [employe.lastName,Validators.required,Validators.pattern(GlobaleConstants.nameRegex)],
        contactNumber: [employe.contactNumber,Validators.required,Validators.pattern(GlobaleConstants.contactNumberRegex)],
        email: [employe.email,Validators.required,Validators.pattern(GlobaleConstants.emailRegex)],
        service : [employe.service,Validators.required],
        poste : [employe.poste,Validators.required],
        TimeInscript : [employe.TimeInscript,Validators.required],
       });
       }
  }

  handleSave(){
    if(this.dataAction === "adit"){
      this.UpdateConger()
    }else{
      this.AddConger();
    }
  } 

  uploadFill(){
    const fillFormData = new FormData()
    const inputFill: HTMLInputElement | null = document.getElementById('inputFill') as HTMLInputElement;
    if(inputFill && inputFill.files && inputFill.files.length > 0){
      this.imagName = inputFill.files[0].name;
      fillFormData.append('file',inputFill.files[0])
      // console.log(fillFormData)
      // fetch('/upload', {
      //   method: 'POST',
      //   body: formData
      // });
    }
    this.gestionGongeService.uploadFill(fillFormData).subscribe({next: (responce:any) => {
      // this.responseMessage = responce.message;
      // this.snackbarService.openSnackbar(this.responseMessage,'');
      
    },error:(error:any) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }else{
        // this.responseMessage = GlobaleConstants.generatError;
        this.responseMessage = "GlobaleConstants.generatError";
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobaleConstants.error);
    }})
    return fillFormData;
  }

  AddConger(){
    this.uploadFill();
    var dataForm = this.employeForm.value;
    var DS = new Date(dataForm.TimeGoing)
    var DE = new Date(dataForm.openTime)
    var date = new Date(dataForm.TimeInscript)
    var day = date.getDate()
    var month = date.getMonth() 
    var year = date.getFullYear()
    var data = {
      firstName : dataForm.firstName,
      lastName : dataForm.lastName,
      contactNumber : dataForm.contactNumber,
      email : dataForm.email,
      service : dataForm.service,
      poste : dataForm.poste,
      TimeInscripet : year +'/'+ month +'/'+ day,
      image : this.imagName
    }

    this.gestionGongeService.addEmploye(data).subscribe({next : (response:any) => {
      this.responseMessage = response.message;
      this.snackbarService.openSnackbar(this.responseMessage,"");
      this.dialogRef.close();
    },error : (error:any) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message; 
      }else{
        this.responseMessage = GlobaleConstants.generatError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobaleConstants.error);
    } })  
    
  }

  UpdateConger(){
    var dataForm = this.employeForm.value;
    var data = {
      firstName : dataForm.firstName,
      lastName : dataForm.lastName,
      contactNumber : dataForm.contactNumber,
      email : dataForm.email,
      service : dataForm.service,
      poste : dataForm.poste,
    }

    this.gestionGongeService.UpdateEmploye(data).subscribe({next: (response:any) => {
      this.responseMessage = response.message;
      this.snackbarService.openSnackbar(this.responseMessage,'');
      this.dialogRef.close();
    },error: (error:any) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobaleConstants.generatError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobaleConstants.error)
    }
    });

  }

}
