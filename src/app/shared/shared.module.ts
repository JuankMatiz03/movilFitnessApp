import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageLighboxComponent } from './components/image-lighbox/image-lighbox.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalCaloriesComponent } from './components/modal-calories/modal-calories.component';


@NgModule({
  declarations: [ImageLighboxComponent , HeaderComponent, ModalCaloriesComponent],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    IonicModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ImageLighboxComponent,
    HeaderComponent,
    ModalCaloriesComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
