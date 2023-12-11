import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRealTimeComponent } from './view-real-time.component';

const routes: Routes = [
  {
    path: '',
    component: ViewRealTimeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRealTimeRoutingModule { }
