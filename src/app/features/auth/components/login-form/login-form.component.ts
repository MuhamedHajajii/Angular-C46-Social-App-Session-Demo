import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Stored_Keys } from '../../../../core/constants/stored-keys';
import { IAuthResponse, User } from '../../interfaces/IAuthResponse';
import { AuthInputComponent } from '../auth-input/auth-input.component';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, AuthInputComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  // injected serves
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  userData!: User;

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor() {
    const userData = JSON.parse(localStorage.getItem(Stored_Keys.userData)!);
    if (userData) {
      this.loginForm.get('email')?.setValue(userData.email);
    }
  }

  onLoginSubmit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      this.errorMessage = '';
      this.successMessage = '';
      this.isLoading = true;

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.handleRegisterSuccessResponse(response);
        },
        error: (error: HttpErrorResponse) => {
          this.handleRegisterFailedResponse(error);
        },
      });
    }
  }

  handleRegisterSuccessResponse(response: IAuthResponse): void {
    console.log(response);
    this.isLoading = false;
    this.successMessage = response.message;
    localStorage.setItem(Stored_Keys.userData, JSON.stringify(response.data.user));
    localStorage.setItem(Stored_Keys.token, JSON.stringify(response.data.token));
    this.router.navigate(['/feed']);
  }

  handleRegisterFailedResponse(error: HttpErrorResponse): void {
    console.log(error);
    this.isLoading = false;
    this.errorMessage = error.error.message;
  }
}
