import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomTextareaComponent } from './custom-textarea.component';

describe('CustomTextareaComponent', () => {
  let component: CustomTextareaComponent;
  let fixture: ComponentFixture<CustomTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomTextareaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate characters remaining correctly', () => {
    component.maxlength = 100;
    component.value = 'test';
    expect(component.charactersRemaining).toBe(96);
  });

  it('should calculate characters used correctly', () => {
    component.value = 'test';
    expect(component.charactersUsed).toBe(4);
  });

  it('should handle empty value', () => {
    component.value = '';
    component.maxlength = 100;
    expect(component.charactersRemaining).toBe(100);
    expect(component.charactersUsed).toBe(0);
  });
});