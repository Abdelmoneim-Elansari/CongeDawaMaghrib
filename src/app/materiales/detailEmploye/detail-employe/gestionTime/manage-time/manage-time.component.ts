import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialpadOutlined } from '@mui/icons-material';
import { Router } from '@angular/router';
import { LeaveTimeService } from 'src/app/services/leave-time.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobaleConstants } from 'src/app/shared/global-constante';
import { DetailEmployeComponent } from '../../detail-employe.component';

@Component({
  selector: 'app-manage-time',
  templateUrl: './manage-time.component.html',
  styleUrls: ['./manage-time.component.css']
})
export class ManageTimeComponent implements OnInit {
  dataSource:any;
  responseMessage:any;
  timeForm:any= UntypedFormGroup;
  action:string= "add"
  constructor(
    @Inject(MAT_DIALOG_DATA) private DialogData:any,
    private dialogRef:MatDialogRef<ManageTimeComponent>,
    private fb:FormBuilder,
    private leaveTimeService:LeaveTimeService,
    private snackbarService:SnackbarService,
    private router:Router,
  ){}
  ngOnInit(): void {
    console.log(this.DialogData.id)
    this.timeForm = this.fb.group({
      TimeGoing: ['',[Validators.required]],
      openTime: ['',[Validators.required]]
    })
  }

  handlSave(){
    if(this.action === "Edit"){

    }else{
      this.addTime()
    }
   this.router.navigate([location.href])
  }

  addTime(){
    const formData = this.timeForm.value
    var DS = new Date(formData.TimeGoing)
    var DE = new Date(formData.openTime)
    var data = {
      dateSorter : DS.getDate()+'/'+DS.getMonth()+'/'+DS.getFullYear(),
      dateEntrer : DE.getDate()+'/'+DE.getMonth()+'/'+DE.getFullYear(),
      employeId : this.DialogData.id,
      dure : (DE.getTime() - DS.getTime())/(1000*60*60*24) /*this.numOfDay(DS,DE)*/
    }
    console.log(data.dateSorter+' , '+data.dateEntrer)
    this.leaveTimeService.addTime(data).subscribe({next : (response:any) => {
      this.responseMessage = response.message;
      this.dialogRef.close();
      this.snackbarService.openSnackbar(this.responseMessage,'');

    },error : (error:any) => {
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobaleConstants.error;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobaleConstants.error);
    }})
  
  }

  updateTime(){
    var data = {}
    this.leaveTimeService.updateTime(data).subscribe({next : (response:any) => {
      this.responseMessage = response.message;
      this.snackbarService.openSnackbar(this.responseMessage,'');
    },error : (error:any) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobaleConstants.generatError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobaleConstants.error);
    }})
  }

  numOfDay(goTime:any,openTime:any){
    let dure = 0
    const numDayOfMonth = [31,29,31,30,31,30,31,31,30,31,30,31];
    dure = openTime.getDay() - goTime.getDay(); 
    console.log()
    console.log(openTime.getDay())
    console.log(dure)
    // if(Math.abs((openTime.getUTCMonth() - goTime.getUTCMonth())) > 0){
      for (let i = Math.min(goTime.getUTCMonth(),openTime.getUTCMonth()); i < Math.max(goTime.getUTCMonth(),openTime.getUTCMonth()); i++) {
        dure += numDayOfMonth[i - 1]  
      }
      if((openTime.getUTCMonth() - goTime.getUTCMonth()) >= 0){
        dure *= 1;
      }else{
        dure *= -1;
      }
    // }
    // dure += (openTime.getUTCFullYear() - goTime.getUTCFullYear())*365.25
    const numofYear = openTime.getUTCFullYear() - goTime.getUTCFullYear();
    dure += numofYear*365.25
    return dure;
  }

}
