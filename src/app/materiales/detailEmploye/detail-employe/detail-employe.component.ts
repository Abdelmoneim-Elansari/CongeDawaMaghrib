import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Message } from '@mui/icons-material';
import { LeaveTimeService } from 'src/app/services/leave-time.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobaleConstants } from 'src/app/shared/global-constante';
import { ManageTimeComponent } from './gestionTime/manage-time/manage-time.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-employe',
  templateUrl: './detail-employe.component.html',
  styleUrls: ['./detail-employe.component.css']
})
export class DetailEmployeComponent implements OnInit{
  displayedColumns = ["id","dateSorter","dateEntre","dure","delete"]
  dataSource:any;
  responseMessage:string = '';
  employeId:any;
  employe:any = {
    name :'--',
    service : '',
    poste : '',
    reste : 0
  }
  constructor(
    private route:ActivatedRoute,
    private leaveTimeService:LeaveTimeService,
    private snackbarService:SnackbarService,
    private dialog:MatDialog
    
  ){}

  ngOnInit(): void {
    const id:Number = Number(this.route.snapshot.paramMap.get('id'));
    this.route.queryParams.subscribe((element) => {
      this.employe.name = element['firstName'] + ' ' + element['lastName']
      this.employe.service = element['service'];
      this.employe.poste = element['poste'];
      this.employe.reste = 30 - element['dure']
    })
    this.getAllTime(id)  ;
    this.employeId = id;
  }

  getAllTime(id:any){
    this.leaveTimeService.getAll(id).subscribe({next: (response:any) => {
      this.dataSource = new MatTableDataSource(response);
      // console.log(this.dataSource)
  },error: (err:any) => {
      if(err.error?.message){
        this.responseMessage = err.error?.message;
      }else{
        this.responseMessage = GlobaleConstants.generatError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobaleConstants.error)
     
    }})
  }

  handladdTime(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '550'
    dialogConfig.data = {
      id : this.employeId,
      // action : action
    }
    this.dialog.open(ManageTimeComponent,dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getAllTime(this.employeId);
    })
    }

  deleteTime(element:any){
    // console.log(typeof this.dataSource)
    var data = {
      id : element.timeId,
      idE : element.employeId,
      dure : element.dure
    }
    this.leaveTimeService.deleteTime(data,element.timeId).subscribe({next : (response:any) => {
      // this.dataSource.
      this.getAllTime(this.employeId);
      console.log(typeof element.dure)
      this.employe.reste += element.dure;
      this.responseMessage = response.message;
      this.snackbarService.openSnackbar(this.responseMessage,'');
    },error : (error:any) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobaleConstants.generatError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobaleConstants.error)
    }})
  }
  
}
