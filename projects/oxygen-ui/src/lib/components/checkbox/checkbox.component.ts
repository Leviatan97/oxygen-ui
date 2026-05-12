import { Component, forwardRef, input, model, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ox-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="ox-checkbox" 
      [class.ox-checkbox-checked]="checked()" 
      [class.ox-checkbox-disabled]="disabled()"
      (click)="toggle($event)">
      <div class="ox-checkbox-box">
        @if (checked()) {
          <svg class="ox-checkbox-icon" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        }
      </div>
      @if (label()) {
        <span class="ox-checkbox-label">{{ label() }}</span>
      }
    </div>
  `,
  styleUrl: './checkbox.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  label = input<string>();
  disabled = input<boolean>(false);
  checked = model<boolean>(false);

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  toggle(event: Event) {
    if (this.disabled()) return;
    
    const newValue = !this.checked();
    this.checked.set(newValue);
    this.onChange(newValue);
    this.onTouched();
  }

  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // handled by signals input
  }
}
