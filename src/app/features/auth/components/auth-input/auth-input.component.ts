import { Component, forwardRef, Input, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-auth-input',
  imports: [],
  templateUrl: './auth-input.component.html',
  styleUrl: './auth-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AuthInputComponent),
    },
  ],
})
export class AuthInputComponent implements ControlValueAccessor {
  @Input() placeHolder = '';
  @Input() label = '';
  @Input() control: any;
  @Input() formGroup: any;
  @Input() inputType = 'text';

  value = '';
  isDisabled = false;
  onBlur = () => {};
  onChange = (value: string) => {};

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onBlur = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
