import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardCaloriesComponent } from './dashboard-calories.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardCaloriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardCaloriesRoutingModule { }
