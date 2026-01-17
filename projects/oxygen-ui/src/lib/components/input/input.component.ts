import { Component, input, computed, ViewEncapsulation, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputFocusColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

let nextId = 0;

@Component({
  selector: 'ox-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'oxy-input-wrapper',
    '[class.oxy-input-wrapper--disabled]': 'disabled()',
    '[class.oxy-input-wrapper--readonly]': 'readonly()',
    '[class.oxy-input-wrapper--error]': '!!error()',
    '[class.oxy-input-wrapper--float]': 'floatLabel()',
    '[class.oxy-input-wrapper--has-value]': 'hasValue()',
    '[class]': '"oxy-input-wrapper--" + size() + " oxy-input-wrapper--" + variant()',
    '[style.--oxy-input-focus-color]': 'computedFocusColor()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  id = input<string>(`oxy-input-${nextId++}`);
  label = input<string>();
  type = input<'text' | 'password' | 'email' | 'number' | 'tel' | 'url'>('text');
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  hint = input<string>();
  error = input<string>();
  required = input<boolean>(false);
  size = input<'sm' | 'md' | 'lg'>('md');
  variant = input<'default' | 'fieldset' | 'oneLine'>('default');
  floatLabel = input<boolean>(false);
  focusColor = input<InputFocusColor>();

  hasLabel = computed(() => !!this.label());
  hasValue = computed(() => !!this.value());

  // Computed para convertir el color del foco a variable CSS
  computedFocusColor = computed(() => {
    const color = this.focusColor();
    if (!color) return undefined;
    
    const colorMap: Record<InputFocusColor, string> = {
      primary: '#3b82f6',
      secondary: '#6b7280',
      success: '#10b981',
      danger: '#ef4444',
      warning: '#f59e0b',
      info: '#06b6d4'
    };
    
    return colorMap[color];
  });

  // Control value accessor
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

  setDisabledState(isDisabled: boolean): void {
    // El estado disabled se maneja a través del input signal
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
