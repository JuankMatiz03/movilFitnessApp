import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardCaloriesRoutingModule } from './dashboard-calories-routing.module';

import { DashboardCaloriesComponent } from './dashboard-calories.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [DashboardCaloriesComponent],
  imports: [
    CommonModule,
    DashboardCaloriesRoutingModule,
    SharedModule
  ]
})
export class DashboardCaloriesModule { }
