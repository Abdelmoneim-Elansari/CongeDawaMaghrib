import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialpadOutlined } from '@mui/icons-material';
import { Router } from '@angular/router';
import { LeaveTimeService } from 'src/app/services/leave-time.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobaleConstants } from 'src/app/shared/global-constante';
import { DetailEmployeComponent } from '../../detail-employe.component';
import { FreeDayService } from 'src/app/services/free-day.service';
import { MatRecycleRows, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manage-time',
  templateUrl: './manage-time.component.html',
  styleUrls: ['./manage-time.component.css']
})
export class ManageTimeComponent implements OnInit {
  dataSource:any;
  responseMessage:any;
  timeForm:any= UntypedFormGroup;
  action:string= "add";
  foundIntr:boolean = false;
  holiday:any = [
   /* {name:"",day : 1,month:1,numDays:1},
    {name:"",day : 11,month:1,numDays:1},
    {name:"",day : 14,month:1,numDays:1},
    {name:"",day : 1,month:5,numDays:1},
    {name:"",day : 30,month:7,numDays:1},
    {name:"",day : 14,month:8,numDays:1},
    {name:"",day : 20,month:8,numDays:1},
    {name:"",day : 21,month:8,numDays:1},
    {name:"",day : 6,month:11,numDays:1},
    {name:"",day : 18,month:11,numDays:1}*/
  ]
  
  constructor(
    @Inject(MAT_DIALOG_DATA) private DialogData:any,
    private dialogRef:MatDialogRef<ManageTimeComponent>,
    private fb:FormBuilder,
    private leaveTimeService:LeaveTimeService,
    private freeDayService:FreeDayService,
    private snackbarService:SnackbarService,
    private router:Router,
  ){}
  ngOnInit(): void {
    // console.log(this.DialogData.id)
    this.timeForm = this.fb.group({
      TimeGoing: ['',[Validators.required]],
      openTime: ['',[Validators.required]]
    })
    this.getAllTime();
  
  }

  handlSave(){
    if(this.action === "Edit"){

    }else{
      this.addTime()
    }
    this.router.navigate([location.href])
  }

  getAllTime(){
    this.leaveTimeService.getAll(this.DialogData.id).subscribe({next: (response:any) => {
      this.dataSource = new MatTableDataSource(response);
    },error: (error:any) => {
      if(error?.error.message){
        this.responseMessage = error?.error.message;
      }else{
        this.responseMessage = GlobaleConstants.generatError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobaleConstants.error)
    }})
  }

  joinTab(){
    this.freeDayService.getAll().subscribe({next : (response:any) => {
     const numDayOfMonth = [31,29,31,30,31,30,31,31,30,31,30,31];
     /*function calculDay(numDay:any){
      var count = 0
      var i = 0;
      count += numDayOfMonth[0]
      while(count < numDay){ 
            count += numDayOfMonth[i];
            console.log(numDayOfMonth[i] +' '+ count +' '+numDay)
            i++;
      }
     
      //const date = {day : numDay - count , month : i}
      return i
     }*/

      for (let i = 0; i < response.length; i++) {
        const dateString = response[i].date
       // const date = Date.parse(response[i].date);
        //var date2 = new Date(date)
      //  var numDay = Math.round((date/(1000*60*60*24*365.25) - Math.round(date/(1000*60*60*24*365.25)))*365.4)
       //console.log(response)
        const [year,month,day] = dateString.split('-')
        this.holiday = [
          ...this.holiday,
          {name:response[i].nameDay,day : Number.parseInt(day) ,month : Number.parseInt(month) ,numDays:response[i].numDays}
        ]
      
      }
       console.log(this.holiday);
    }})
  }


  addTime(){
   this.Intersection()
    console.log(this.foundIntr);
    if (this.foundIntr) {
      this.snackbarService.openSnackbar(this.responseMessage,GlobaleConstants.error)
    }else{
   if (this.DialogData.status) {
    const formData = this.timeForm.value;
    var DS = new Date(formData.TimeGoing)
    var DE = new Date(formData.openTime)
    const dayS = DS.getDate()
    const monthS = DS.getMonth() + 1
    const yaerS = DS.getFullYear()
    const dayE = DE.getDate()
    const monthE = DE.getMonth() + 1
    const yaerE = DE.getFullYear()
    var periodDay = (DE.getTime() - DS.getTime())/(1000*60*60*24);
    var cont = this.nbJoursFirie(DS,DE)
     // var numDim = this.numDim(DS,DE)
    var data = {
      dateSorter : yaerS+'-'+monthS+'-'+dayS,
      dateEntrer : yaerE+'-'+monthE+'-'+ dayE,
      employeId : this.DialogData.id,
      // dure : (DE.getTime() - DS.getTime())/(1000*60*60*24) - cont - numDim /*this.numOfDay(DS,DE)*/
      dure : Math.round((6*periodDay + (DE.getDay() - DS.getDay()))/7) - cont 
    }
   
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
   }else{
    this.snackbarService.openSnackbar('vous devez d\'avoir 8 month au dawaMaghribe',GlobaleConstants.error);
   }
  }
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
    dure = openTime.getDate() - goTime.getDate(); 
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


  nbJoursFirie(dS:any,dE:any){
    const DSD = dS.getDate();
    const DSM = parseInt(dS.getMonth()) + 1;
    const DED = dE.getDate();
    const DEM = parseInt(dE.getMonth()) + 1;
    var cont = 0
   // console.log(DSD +" "+DSM+" "+DED+" "+DEM)
    for (let i = 0; i < this.holiday.length; i++) {
      if (DSM <= this.holiday[i].month  && DEM >= this.holiday[i].month ) {
        if (DSD <= this.holiday[i].day  && DED >= this.holiday[i].day) {
          cont +=this.holiday[i].numDays;
        }
      }
    }
    return cont;
  }
  numDim(dS:any,dE:any){
  const periodDay = (dE.getTime() - dS.geTime())/(1000*60*60*24);
  // const beforDay = 7 - dS.getDay()
  // const afterDay = dE.getDay()
  const numDim = Math.round((periodDay + dS.getDay() - dE.getDay())/7) 
  return numDim;
  }

Intersection() {
    const date = {start : new Date(this.timeForm.value.TimeGoing).getTime() , end : new Date(this.timeForm.value.openTime).getTime()}
    if (date.start > date.end) {
      this.foundIntr = true;
      this.responseMessage = "Vous evez inversé la date d'entrée et la date de sortie"
    }else{
      if(this.dataSource){
     this.dataSource.data.forEach((element:any) => {
    var startleave = new Date(element.dateSorter).getTime();
    var endLeave = new Date(element.dateEntrer).getTime();
    console.log(date.end+" "+startleave+" , "+endLeave+" "+date.start)
    // console.log(date.end+" "+date.start)
      if(date.end > startleave && endLeave > date.start){
       this.foundIntr = true;
      this.responseMessage = "Il y a une intersection entre les périodes.";
      }else{
        this.foundIntr = false
      }
     // return this.foundIntr;
    });
    }
    
  }
  
  /*   for (let i = 0; i < this.dataSource.length; i++) {
      
    }*/
  }
  
}
