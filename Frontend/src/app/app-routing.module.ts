import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { content } from './shared/routes/content-routes';
import { ContentLayoutComponent } from './shared/layout/content-layout/content-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [

  /* For Racine */
  {
    path: 'D',
    component: ContentLayoutComponent,
    children: content,
    //canActivate: [AuthGuard] ,
  },
  {
    path: 'Dashboard',
   //redirectTo: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    component: LoginComponent,
    children: content
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
