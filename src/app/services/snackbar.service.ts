import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'
import { ManageTimeComponent } from '../materiales/detailEmploye/detail-employe/gestionTime/manage-time/manage-time.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar:MatSnackBar) { }

  openSnackbar(message:string,action:string ){
    if (action === 'error') {
      this.snackbar.open(message,'',{
        horizontalPosition : 'end',
        verticalPosition : 'top',
        duration : 2000,
        panelClass : ['black-snackbar']
      })
    }else{
      this.snackbar.open(message,'',{
        horizontalPosition : 'center',
        verticalPosition : 'top',
        duration : 2000,
        panelClass : ['green-snackbar']
      })
    }
  }
  
}
