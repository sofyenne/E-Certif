import { Routes } from '@angular/router';

export const content: Routes = [

  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
  },

  {
    path: 'etablissemnt',
    loadChildren: () => import('../../components/etablissement/etablissement.module').then(m => m.EtablissementModule),
    data : {
    breadcrumb: "Etablissement"
  }
  },

  {
    path: 'users',
    loadChildren: () => import('../../components/users/users.module').then(m => m.UsersModule),
    data: {
      breadcrumb: "Users"
    }
  },
  
];