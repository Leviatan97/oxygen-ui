import { Component, input, forwardRef, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'ox-date-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="oxy-input-wrapper" 
         [class.oxy-input-wrapper--disabled]="disabled()"
         [class.oxy-input-wrapper--error]="!!error()"
         [class.oxy-input-wrapper--float]="floatLabel()"
         [class.oxy-input-wrapper--has-value]="!!value()"
         [ngClass]="[
           'oxy-input-wrapper--' + size(),
           variant() === 'fieldset' ? 'oxy-input-wrapper--fieldset' : '',
           variant() === 'oneLine' ? 'oxy-input-wrapper--oneLine' : ''
         ]">
      
      @if (label()) {
        <label [for]="id()" class="oxy-input-label">
          {{ label() }}
          @if (required()) {
            <span class="oxy-input-required">*</span>
          }
        </label>
      }

      <div class="oxy-input-container">
        <input
          [id]="id()"
          type="date"
          [value]="value()"
          [disabled]="disabled()"
          [required]="required()"
          [min]="min()"
          [max]="max()"
          class="oxy-input-field"
          (input)="onInput($event)"
          (blur)="onBlur()"
        />
      </div>

      @if (error()) {
        <div class="oxy-input-error" role="alert">{{ error() }}</div>
      } @else if (hint()) {
        <div class="oxy-input-hint">{{ hint() }}</div>
      }
    </div>
  `,
  styleUrl: './date-input.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ]
})
export class DateInputComponent implements ControlValueAccessor {
  id = input<string>(`oxy-date-${Math.random().toString(36).substr(2, 9)}`);
  label = input<string>();
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  min = input<string>();
  max = input<string>();
  hint = input<string>();
  error = input<string>();
  size = input<'sm' | 'md' | 'lg'>('md');
  floatLabel = input<boolean>(false);
  variant = input<'default' | 'fieldset' | 'oneLine'>('default');

  value = signal<string>('');

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value.set(input.value);
    this.onChange(input.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
