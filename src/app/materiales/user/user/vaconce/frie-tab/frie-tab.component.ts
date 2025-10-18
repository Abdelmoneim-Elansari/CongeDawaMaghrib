import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FreeDayService } from 'src/app/services/free-day.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobaleConstants } from 'src/app/shared/global-constante';

@Component({
  selector: 'app-frie-tab',
  templateUrl: './frie-tab.component.html',
  styleUrls: ['./frie-tab.component.css']
})
export class FrieTabComponent implements OnInit {
  dayForm:any = UntypedFormGroup
  displayColumns:string[] = ["name","date","numDays","delHD"];
  datasource:any;
  responseMessage: any='';
  readonly panelOpenState = signal(false)
  constructor(private fb:FormBuilder,
    private freeDayService:FreeDayService,
    private snacckbarService:SnackbarService
  ){}

  ngOnInit(): void {
    this.dayForm = this.fb.group({
      dayName : ['',Validators.pattern(GlobaleConstants.nameRegex)],
      date: ['',Validators.required],
      numDays : ['',Validators.required]
    })
   this.getHolidays();
  }
  addHoliday(){
    var formData = this.dayForm.value 

    var data = {
      nameday : formData.dayName,
      date : formData.date,
      numDays : formData.numDays
    }

    this.freeDayService.addFreeDay(data).subscribe({next : (response:any) => {
      this.getHolidays();
      this.responseMessage = response.message;
      this.snacckbarService.openSnackbar(this.responseMessage,'');
      this.dayForm.setValue({
      dayName : '',
      date: '',
      numDays : ''
    })
    },error : (error:any) => {
      if(error?.error.message){
        this.responseMessage = error?.error.message;
      }else{
        this.responseMessage = GlobaleConstants.generatError;
      }
      this.snacckbarService.openSnackbar(this.responseMessage,GlobaleConstants.error);
    }})
  }

  getHolidays(){
    this.freeDayService.getAll().subscribe({next : (response:any) => {
      this.datasource = new MatTableDataSource(response);
    },error : (error:any) => {
      if(error?.error.message){
        this.responseMessage = error?.error.message
      }else{
        this.responseMessage = GlobaleConstants.generatError;
      }
      this.snacckbarService.openSnackbar(this.responseMessage,GlobaleConstants.error)
    }
  })}

  delHoliday(holiday:any){ 
    this.freeDayService.delete(holiday.freeDayId).subscribe({next : (response:any) => {
      this.getHolidays();
      this.responseMessage = response.message;
      this.snacckbarService.openSnackbar(this.responseMessage,'');
    },error : (error:any) => {
      if(error?.error.message){
        this.responseMessage = error?.error.message;
      }else{
        this.responseMessage = GlobaleConstants.generatError
      }
      this.snacckbarService.openSnackbar(this.responseMessage,GlobaleConstants.error);
    }});
  }
  
}
