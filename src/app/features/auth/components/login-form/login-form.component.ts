import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Stored_Keys } from '../../../../core/constants/stored-keys';
import { IAuthResponse } from '../../interfaces/IAuthResponse';
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

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),

    password: new FormControl('', [Validators.required]),
  });

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
    this.router.navigate(['/feed']);
    localStorage.setItem(Stored_Keys.userData, JSON.stringify(response.data.user));
  }

  handleRegisterFailedResponse(error: HttpErrorResponse): void {
    console.log(error);
    this.isLoading = false;
    this.errorMessage = error.error.message;
  }
}
