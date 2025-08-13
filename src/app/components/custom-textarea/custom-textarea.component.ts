import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonItem, IonTextarea, IonNote, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-textarea',
  templateUrl: './custom-textarea.component.html',
  styleUrls: ['./custom-textarea.component.scss'],
  standalone: true,
  imports: [CommonModule, IonItem, IonTextarea, IonNote, IonLabel],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomTextareaComponent),
      multi: true
    }
  ]
})
export class CustomTextareaComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() maxlength: number = 500;
  @Input() rows: number = 4;
  @Input() autoGrow: boolean = true;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() errorText: string = '';
  @Input() helperText: string = '';
  @Input() showCharacterCount: boolean = true;
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