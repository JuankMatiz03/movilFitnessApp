import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'home',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../../pages/dashboard-calories/dashboard-calories.module').then(m => m.DashboardCaloriesModule)
      },
      {
        path: 'view-real-time',
        loadChildren: () => import('../../pages/view-real-time/view-real-time.module').then(m => m.ViewRealTimeModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../../pages/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: '',
        redirectTo: '/home/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
