import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default type "button"', () => {
    const buttonElement: HTMLElement = fixture.nativeElement;
    expect(buttonElement.getAttribute('type')).toBe('button');
  });

  it('should apply aria-label', () => {
    fixture.componentRef.setInput('aria-label', 'test label');
    fixture.detectChanges();
    const buttonElement: HTMLElement = fixture.nativeElement;
    expect(buttonElement.getAttribute('aria-label')).toBe('test label');
  });

  it('should apply aria-disabled when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const buttonElement: HTMLElement = fixture.nativeElement;
    expect(buttonElement.getAttribute('aria-disabled')).toBe('true');
  });

  it('should apply aria-expanded', () => {
    fixture.componentRef.setInput('aria-expanded', true);
    fixture.detectChanges();
    const buttonElement: HTMLElement = fixture.nativeElement;
    expect(buttonElement.getAttribute('aria-expanded')).toBe('true');
  });
});
