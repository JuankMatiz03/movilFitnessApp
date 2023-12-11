import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentConstant } from 'src/app/shared/constants/document.constants';
import { GenderConstant } from 'src/app/shared/constants/gender.constants';
import { UserService } from '../../../core/services/user/user.service';
import { SingletonDocumentService } from '../../../core/services/singleton/singleton-document.service';
import { RegisterModel } from 'src/app/core/models/auth/register.model';
import { ResponseModel } from 'src/app/core/models/response/Response.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {

  private fb: FormBuilder = inject(FormBuilder);
  private userService: UserService = inject(UserService);
  private singletonService: SingletonDocumentService = inject(SingletonDocumentService);


  urlImage: string = "https://ionicframework.com/docs/img/demos/avatar.svg";
  formProfile: FormGroup = this.fb.nonNullable.group({
    photo_profile: ["https://ionicframework.com/docs/img/demos/avatar.svg"],
    first_name: ['', [Validators.required]],
    second_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    type_document: ['', [Validators.required]],
    address: ['' , [Validators.required]],
    number_document: ['', Validators.required],
    password: ['', [Validators.required]],
    phone: ['' ,[Validators.required]],
    photo_id_back: [''],
    photo_id_front: [''],
  });
  genderList = [
    {key: 'Hombre', value: GenderConstant.Man},
    {key: 'Mujer', value: GenderConstant.Woman},
  ];
  documentTypeList = [
    {key: 'Cedula de ciudadania', value: DocumentConstant.Cedula},
    {key: 'Cedula de extranjeria', value: DocumentConstant.CedulaExtranjeria},
    {key: 'Tarjeta de identidad', value: DocumentConstant.TarjetaIdentidad},
  ];
  _isLoad: Promise<any> = Promise.resolve(true);
  showAlert: boolean = false
  showAlertError: boolean = false

  ngOnInit() {
    this.getUser();
  }

  async updateUser() {
    const { value } = await this.singletonService.getDocument();
    this.userService.updateUser(value as string, this.formProfile.getRawValue())
    .subscribe(response => {
      if(response.status == 200) {
        this.showAlert = true
        setTimeout(() => {
          this.showAlert = false
        }, 3000)
      }else {
        this.showAlertErrors()
      }
    })
  }

  async getUser() {
    const { value } = await this.singletonService.getDocument()

    this.userService.getProfile(value as string)
    .pipe(
    ).subscribe(response => {
        this.chargeForm(response.data);
    })
  }

  chargeForm(model: RegisterModel) {
    this.formProfile = this.fb.nonNullable.group(model)
  }

  showAlertErrors() {
    this.showAlertError = true;
    setTimeout(() => {
      this.showAlertError = false;
    }, 4000)
  }

  getImage(event: string) {
    this.formProfile?.controls?.["photo_profile"].setValue(event);
  }
}
