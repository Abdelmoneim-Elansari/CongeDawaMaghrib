import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table'
import { GestionComponent } from './gestionConger/gestion/gestion.component';
import { GestionDeCongesService } from 'src/app/services/gestion-de-conges.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobaleConstants } from 'src/app/shared/global-constante';
// import EditIcon from '@mui/icons-material/Edit';
// import * as React from 'react';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {
  displayedColumns:string[] = ['firstName','lastName','service','poste','dure'];
  responseMessage:any;
  dataSource:any;
  constructor(private dialog:MatDialog,
    private gestionCongerService:GestionDeCongesService,
    private snackbarService:SnackbarService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.TableData();
  }

  filterAction(){}

  addConger(){
    const dialogConfig=new MatDialogConfig();

    dialogConfig.width = '50%';
    this.dialog.open(GestionComponent,dialogConfig)
  }

  TableData(){
    this.gestionCongerService.getAll().subscribe({next: (response:any) => {
      this.dataSource = new MatTableDataSource(response);
      console.log(this.dataSource);
      this.responseMessage = 'bienvenue';
      this.snackbarService.openSnackbar(this.responseMessage,"");
    },error: (error) => {
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobaleConstants.generatError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobaleConstants.error);
    }})
  }

  editConger(product:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      ...product,
      action : "edit"
    }
    dialogConfig.width = "555"
    this.dialog.open(GestionComponent,dialogConfig);
  }

  deleteConger(id:any){
    this.gestionCongerService.deletedEmploye(id).subscribe({next: (response:any) => {
      this.responseMessage = "deleted successfully!";
      this.snackbarService.openSnackbar(this.responseMessage,'');
    },error: (error:any) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobaleConstants.generatError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobaleConstants.error);
    }});
  }

  routerLink(element:any){
    this.router.navigate(['/employes',element.id],{queryParams : element})
  }
  // [routerLink]="['/employes',element.id]"

  routeLink(event:any){
    console.log(event)
  }
}
