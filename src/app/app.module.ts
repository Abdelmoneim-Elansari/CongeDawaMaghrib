import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HommeComponent } from './homme/homme/homme.component';
import { EmployesComponent } from './employés/employes/employes.component';
import { LoginComponent } from './login/login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { EmployeComponent } from './materiales/employe/employe.component';
import { GestionComponent } from './materiales/employe/gestionConger/gestion/gestion.component';
import { MatTableModule } from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DetailEmployeComponent } from './materiales/detailEmploye/detail-employe/detail-employe.component';
import EditIcon from '@mui/icons-material/Edit';
import { ManageTimeComponent } from './materiales/detailEmploye/detail-employe/gestionTime/manage-time/manage-time.component';



@NgModule({
  declarations: [
    AppComponent,
    HommeComponent,
    EmployesComponent,
    LoginComponent,
    SignupComponent,
    EmployeComponent,
    GestionComponent,
    DetailEmployeComponent,
    ManageTimeComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
    
    
  ],
  schemas: [NO_ERRORS_SCHEMA] ,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
