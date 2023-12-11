import { Component, AfterViewInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LocationService } from 'src/app/core/services/location/location.service';
import { SingletonDocumentService } from 'src/app/core/services/singleton/singleton-document.service';
import { DocumentConstant } from 'src/app/shared/constants/document.constants';
import { GenderConstant } from 'src/app/shared/constants/gender.constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements AfterViewInit {

  private authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  private singletonID = inject(SingletonDocumentService);
  private location: LocationService = inject(LocationService);
  private router: Router = inject(Router);

  urlImage: string = "https://ionicframework.com/docs/img/demos/avatar.svg";
  registerForm = this.fb.nonNullable.group({
    photo_profile: ['https://ionicframework.com/docs/img/demos/avatar.svg'],
    first_name: ['', [Validators.required]],
    second_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    type_document: ['', [Validators.required]],
    address: ['' , [Validators.required]],
    number_document: ['', Validators.required],
    password: ['', [Validators.required]],
    phone: ['', [Validators.required]],
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
  showErrorAlert: boolean = false;
  _isLoad: Promise<any> = Promise.resolve(true);

  ngAfterViewInit() {
    this.getLocation();
  }

  async getLocation() {
    this.location.getAddress().subscribe((response: any) => {
      this.registerForm?.controls?.address.setValue(response.results[0].formatted_address);
    }), catchError(error => {
      console.error('Error al obtener la dirección desde las coordenadas:', error);
      throw error;
    })
  }

  saveUser() {
    Promise.resolve(false);
    let { number_document } = this.registerForm.getRawValue();

    this.authService.createUser(this.registerForm.getRawValue())
    .subscribe(response => {
      if(response.status == 200) {
        this.authService.authenticatedUser = true;
        this.singletonID.setDocument(number_document);
        this.router.navigate(['/home/dashboard']);
      }else {
        this.showAlert();
        Promise.resolve(true);
      }
    })
  }

  getImage(event: string) {
    console.log("eventGoPhater", event)
    this.registerForm?.controls.photo_profile.setValue(event);
  }

  showAlert() {
    this.showErrorAlert = true;
    setTimeout(() => {
      this.showErrorAlert = false;
    }, 4000)
  }
}
