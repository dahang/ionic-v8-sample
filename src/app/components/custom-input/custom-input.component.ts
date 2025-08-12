import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonItem, IonInput, IonNote, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: true,
  imports: [CommonModule, IonItem, IonInput, IonNote, IonLabel],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() maxlength: number = 100;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() errorText: string = '';
  @Input() helperText: string = '';
  @Input() showCharacterCount: boolean = true;
  @Input() inputmode: string = 'text';
  @Input() autocomplete: string = 'off';
  @Input() name: string = '';
  
  @Output() ionInput = new EventEmitter<any>();
  @Output() ionChange = new EventEmitter<any>();
  @Output() ionBlur = new EventEmitter<any>();
  @Output() ionFocus = new EventEmitter<any>();

  value: string = '';
  touched: boolean = false;
  
  onChange: any = () => {};
  onTouched: any = () => {};

  get charactersRemaining(): number {
    return this.maxlength - (this.value?.length || 0);
  }

  get charactersUsed(): number {
    return this.value?.length || 0;
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInputChange(event: any): void {
    this.value = event.detail.value || '';
    this.onChange(this.value);
    if (event.type === 'ionInput') {
      this.ionInput.emit(event);
    } else {
      this.ionChange.emit(event);
    }
  }

  handleBlur(event: any): void {
    this.touched = true;
    this.onTouched();
    this.ionBlur.emit(event);
  }

  handleFocus(event: any): void {
    this.ionFocus.emit(event);
  }
}