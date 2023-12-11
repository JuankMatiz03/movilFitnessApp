import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SingletonDocumentService } from '../../../core/services/singleton/singleton-document.service';
import { UserService } from '../../../core/services/user/user.service';
import { CaloriesModel } from 'src/app/core/models/calories/calories.model';

@Component({
  selector: 'cp-modal-calories',
  templateUrl: './modal-calories.component.html',
  styleUrls: ['./modal-calories.component.scss'],
})
export class ModalCaloriesComponent  implements OnInit {

  @Output() item = new EventEmitter<CaloriesModel>();

  private fb: FormBuilder = inject(FormBuilder);
  private singletonService: SingletonDocumentService = inject(SingletonDocumentService);
  private userService: UserService = inject(UserService);

  form: FormGroup = this.fb.nonNullable.group({});
  isModalOpen = false;

  constructor() { }

  ngOnInit() {
    this.setForm();
  }

  async setForm() {
    const { value } = await this.singletonService.getDocument()
    this.form = this.fb.nonNullable.group({
      number_document: [value],
      food: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      average_calories: ['', [Validators.required]],
      time_hour: ['2023-12-05 12:00:00'],
      off_line: [false]
    })
  }

  openModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  sendCalories() {
    this.userService.createCalories(this.form.getRawValue()).subscribe(response =>{
      if(response.status == 200){
        this.item.emit(this.form.getRawValue());
        this.isModalOpen = false;
        console.log("creado")
      }else {
        console.log("error al añadir")
      }
    })
  }
}
