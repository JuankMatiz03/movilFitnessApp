import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRealTimeRoutingModule } from './view-real-time-routing.module';

import { ViewRealTimeComponent } from './view-real-time.component';


@NgModule({
  declarations: [ViewRealTimeComponent],
  imports: [
    CommonModule,
    ViewRealTimeRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ViewRealTimeModule { }
