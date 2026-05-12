import { Component, input, model, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface RadioOption<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
}

@Component({
  selector: 'ox-radio-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="oxy-radio-group" [class.oxy-radio-group--vertical]="vertical()">
      @for (option of options(); track option.value) {
        <label class="oxy-radio-item" [class.oxy-radio-item--disabled]="disabled() || option.disabled">
          <input 
            type="radio" 
            [name]="name()" 
            [value]="option.value" 
            [checked]="value() === option.value"
            [disabled]="disabled() || option.disabled"
            (change)="onSelect(option.value)"
            class="oxy-radio-input">
          <span class="oxy-radio-circle"></span>
          <span class="oxy-radio-label">{{ option.label }}</span>
        </label>
      }
    </div>
  `,
  styleUrl: './radio.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    }
  ]
})
export class RadioGroupComponent implements ControlValueAccessor {
  options = input<RadioOption[]>([]);
  name = input<string>(`oxy-radio-${Math.random().toString(36).substr(2, 9)}`);
  disabled = input<boolean>(false);
  vertical = input<boolean>(false);
  
  value = model<any>(null);

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  onSelect(val: any) {
    this.value.set(val);
    this.onChange(val);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
