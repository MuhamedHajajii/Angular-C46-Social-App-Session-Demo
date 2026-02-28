import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthInputComponent } from '../auth-input/auth-input.component';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Stored_Keys } from '../../../../core/constants/stored-keys';
import { Router, RouterLink } from '@angular/router';
import { IAuthResponse } from '../../interfaces/IAuthResponse';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, AuthInputComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  // injected serves
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  registerForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/),
      ]),
      rePassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/),
      ]),
    },
    { validators: [this.passwordMissMatch] },
  );

  onRegisterSubmit() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      console.log(this.registerForm.value);

      this.errorMessage = '';
      this.successMessage = '';
      this.isLoading = true;

      this.authService.register(this.registerForm.value).subscribe({
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
    this.router.navigate(['/login']);
    localStorage.setItem(Stored_Keys.userData, JSON.stringify(response.data.user));
  }

  handleRegisterFailedResponse(error: HttpErrorResponse): void {
    console.log(error);
    this.isLoading = false;
    this.errorMessage = error.error.message;
  }

  passwordMissMatch(formGroup: AbstractControl) {
    const password = formGroup.get('password')?.value;
    const rePassword = formGroup.get('rePassword')?.value;

    return password === rePassword ? null : { missMatch: true };
  }
}
