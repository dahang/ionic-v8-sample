import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons,
  IonButton,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonIcon,
  ToastController,
  LoadingController
} from '@ionic/angular/standalone';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { addIcons } from 'ionicons';
import { saveOutline, personOutline, mailOutline, callOutline, businessOutline, cardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.page.html',
  styleUrls: ['./add-account.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonIcon,
    CustomInputComponent
  ]
})
export class AddAccountPage implements OnInit {
  accountForm!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    addIcons({ saveOutline, personOutline, mailOutline, callOutline, businessOutline, cardOutline });
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.accountForm = this.formBuilder.group({
      accountName: ['', [Validators.required, Validators.maxLength(50)]],
      accountNumber: ['', [Validators.required, Validators.maxLength(20)]],
      fullName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9+\\-\\s()]*$'), Validators.maxLength(20)]],
      company: ['', [Validators.maxLength(100)]],
      address: ['', [Validators.maxLength(200)]],
      notes: ['', [Validators.maxLength(500)]]
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.accountForm.get(fieldName);
    if (control?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control?.hasError('pattern')) {
      return 'Please enter a valid phone number';
    }
    if (control?.hasError('maxlength')) {
      const maxLength = control.errors?.['maxlength'].requiredLength;
      return `Maximum ${maxLength} characters allowed`;
    }
    return '';
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      accountName: 'Account Name',
      accountNumber: 'Account Number',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      company: 'Company',
      address: 'Address',
      notes: 'Notes'
    };
    return labels[fieldName] || fieldName;
  }

  async onSubmit(): Promise<void> {
    if (this.accountForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Creating account...',
        spinner: 'circles'
      });
      await loading.present();

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const formData = this.accountForm.value;
        console.log('Account data:', formData);
        
        // Here you would typically save to a service or API
        // For now, we'll just show a success message
        
        await loading.dismiss();
        
        const toast = await this.toastController.create({
          message: 'Account created successfully!',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        });
        await toast.present();
        
        // Navigate back or to account list
        this.router.navigate(['/tabs/tab1']);
      } catch (error) {
        await loading.dismiss();
        
        const toast = await this.toastController.create({
          message: 'Failed to create account. Please try again.',
          duration: 3000,
          position: 'bottom',
          color: 'danger'
        });
        await toast.present();
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.accountForm.controls).forEach(key => {
        this.accountForm.get(key)?.markAsTouched();
      });
      
      const toast = await this.toastController.create({
        message: 'Please fill in all required fields correctly.',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      });
      await toast.present();
    }
  }

  onCancel(): void {
    this.router.navigate(['/tabs/tab1']);
  }
}