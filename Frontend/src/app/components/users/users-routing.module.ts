import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/shared/service/auth/auth.guard';
import { ListUserComponent } from './list-user/list-user.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users-crud',
        component: ListUserComponent,
        //canActivate: [AuthGuard] ,
        data: {
         
          title: "User List",
          breadcrumb: "User List"
        }
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
