import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/shared/service/auth/auth.guard';
import { EtablissementComponent } from './etablissement.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'etablissement-crud',
        component: EtablissementComponent,
        //canActivate: [AuthGuard] ,
        data: {
        
          title: "etablissement",
          breadcrumb: "Etablissement"
        }
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtablissementRoutingModule { }
