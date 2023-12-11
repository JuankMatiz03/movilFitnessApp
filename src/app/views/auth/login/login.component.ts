import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SingletonDocumentService } from '../../../core/services/singleton/singleton-document.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  private singletonID = inject(SingletonDocumentService);

  loginForm = this.fb.nonNullable.group({
    number_document: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  showErrorAlert: boolean = false;
  _isLoad: Promise<any> = Promise.resolve(true);

  ngOnInit(){}

  public sendLogin() {
    this._isLoad = Promise.resolve(false);
    const { number_document, password } = this.loginForm.getRawValue();
    this.authService.sendLogin({
      number_document,
      password
    }).subscribe((response) => {
      if(response.status == 200) {
        this.singletonID.setDocument(number_document);
        this.authService.authenticatedUser = true;
        this.router.navigate(['/home/dashboard']);
      }else {
        this.showAlert();
        Promise.resolve(true);
      }
    })
  }

  showAlert() {
    this.showErrorAlert = true;
    setTimeout(() => {
      this.showErrorAlert = false;
    }, 4000)
  }


}
