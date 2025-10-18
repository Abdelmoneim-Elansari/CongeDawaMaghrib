import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HommeComponent } from './homme/homme/homme.component';
import { EmployesComponent } from './employés/employes/employes.component';
import { EmployeComponent } from './materiales/employe/employe.component';
import { DetailEmployeComponent } from './materiales/detailEmploye/detail-employe/detail-employe.component';
import { RouteGuardService } from './services/route-guard.service';
import { UserComponent } from './materiales/user/user/user.component';
import { FullComponent } from './full/full/full.component';

const routes: Routes = [
  {path : "home",component : HommeComponent},
  {path: "",redirectTo : "home",pathMatch : "full"},
  {path: 'full',component: FullComponent,
    children: [
      {path : "employes",component : EmployeComponent,
    canActivate :[RouteGuardService],
    data : {
      expectedRole : ['admin','user']
    }},
  {path : "employes/:id",component : DetailEmployeComponent,
    canActivate :[RouteGuardService],
    data : {
      expectedRole : ['admin','user']
    }
  },
  {path : "user",component : UserComponent,canActivate : [RouteGuardService],
    data : {
      expectedRole : ['admin','user']
  }}
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
