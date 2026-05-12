import { Component, input, computed, ViewEncapsulation, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'ox-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (label() && variant() !== 'fieldset' && !floatLabel()) {
      <label [for]="id()" class="oxy-input-label">
        {{ label() }}
        @if (required()) {
          <span class="oxy-input-required">*</span>
        }
      </label>
    }

    <div class="oxy-input-container">
      @if (label() && (variant() === 'fieldset' || floatLabel())) {
        <label [for]="id()" class="oxy-input-label">
          {{ label() }}
          @if (required()) {
            <span class="oxy-input-required">*</span>
          }
        </label>
      }
      <input
        [id]="id()"
        [type]="showPassword() ? 'text' : 'password'"
        [value]="value()"
        [placeholder]="(floatLabel() && !hasValue()) ? '' : placeholder()"
        [disabled]="disabled()"
        [required]="required()"
        class="oxy-input-field oxy-password-field"
        (input)="onInput($event)"
        (blur)="onBlur()"
      />
      <button 
        type="button" 
        class="oxy-password-toggle"
        (click)="togglePassword()"
        [disabled]="disabled()"
        aria-label="Toggle password visibility">
        @if (showPassword()) {
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>
        } @else {
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12.008a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        }
      </button>
    </div>

    @if (error()) {
      <div class="oxy-input-error" role="alert">{{ error() }}</div>
    } @else if (hint()) {
      <div class="oxy-input-hint">{{ hint() }}</div>
    }
  `,
  styleUrl: './password.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.oxy-input-wrapper--disabled]': 'disabled()',
    '[class.oxy-input-wrapper--error]': '!!error()',
    '[class.oxy-input-wrapper--float]': 'floatLabel()',
    '[class.oxy-input-wrapper--has-value]': 'hasValue()',
    '[class]': '"oxy-input-wrapper oxy-input-wrapper--" + size() + " oxy-input-wrapper--" + variant()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true
    }
  ]
})
export class PasswordComponent implements ControlValueAccessor {
  id = input<string>(`oxy-password-${Math.random().toString(36).substr(2, 9)}`);
  label = input<string>();
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  hint = input<string>();
  error = input<string>();
  size = input<'sm' | 'md' | 'lg'>('md');
  variant = input<'default' | 'fieldset' | 'oneLine'>('default');
  floatLabel = input<boolean>(false);

  value = signal<string>('');
  showPassword = signal<boolean>(false);

  hasValue = computed(() => !!this.value());

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  togglePassword() {
    if (this.disabled()) return;
    this.showPassword.update(v => !v);
  }

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
