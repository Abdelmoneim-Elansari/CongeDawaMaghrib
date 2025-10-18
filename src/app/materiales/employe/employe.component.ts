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
import { FullComponent } from 'src/app/full/full/full.component';


@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {
  clicked:any = true
  displayedColumns:string[] = ['firstName','lastName','service','poste','dure','inscription','delete'];
  responseMessage:any;
  dataSource:any;
  constructor(private dialog:MatDialog,
    private fullComponent:FullComponent,
    private gestionCongerService:GestionDeCongesService,
    private snackbarService:SnackbarService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.TableData();
  }

  filterAction(event:Event){
     const filerValue = (event.target as HTMLInputElement).value 
     this.dataSource.filter = filerValue.trim().toLowerCase();
  }

  addConger(){
    const dialogConfig=new MatDialogConfig();

    dialogConfig.width = '50%';
    this.dialog.open(GestionComponent,dialogConfig)
    this.TableData()
  }

  TableData(){
    this.gestionCongerService.getAll().subscribe({next: (response:any) => {
      this.dataSource = new MatTableDataSource(response);
    //  console.log(this.dataSource);
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

  deleteEmploye(employe:any){
    this.gestionCongerService.deletedEmploye(employe.id).subscribe({next: (response:any) => {
      this.TableData();
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
    const btn = document.getElementById('btn')
    //const clicks = new WeakSet
    btn?.addEventListener("click",() => {
      this.clicked = true;
    })
    
    if (this.clicked == false) {
    this.router.navigate(['/full/employes',element.id],{queryParams : element})
    this.fullComponent.pageName = 'employes'
  //  console.log(this.fullComponent.pageName)
    }else{
      console.log('you went deleted this employe')
      this.clicked = false;
    }
   
    /**/
  }
  // [routerLink]="['/employes',element.id]"

  routeLink(event:any){
  //  console.log(event)
  }
}
