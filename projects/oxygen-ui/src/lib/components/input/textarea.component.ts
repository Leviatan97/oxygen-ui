import { Component, input, signal, ViewEncapsulation, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'ox-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="oxy-input-wrapper" 
         [class.oxy-input-wrapper--disabled]="disabled()"
         [class.oxy-input-wrapper--error]="!!error()"
         [ngClass]="'oxy-input-wrapper--' + size()">
      
      @if (label()) {
        <label [for]="id()" class="oxy-input-label">
          {{ label() }}
          @if (required()) {
            <span class="oxy-input-required">*</span>
          }
        </label>
      }

      <div class="oxy-input-container">
        <textarea
          [id]="id()"
          [value]="value()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [required]="required()"
          [rows]="rows()"
          class="oxy-textarea-field"
          (input)="onInput($event)"
          (blur)="onBlur()"
        ></textarea>
      </div>

      @if (error()) {
        <div class="oxy-input-error" role="alert">{{ error() }}</div>
      } @else if (hint()) {
        <div class="oxy-input-hint">{{ hint() }}</div>
      }
    </div>
  `,
  styleUrl: './textarea.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent implements ControlValueAccessor {
  id = input<string>(`oxy-textarea-${Math.random().toString(36).substr(2, 9)}`);
  label = input<string>();
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  rows = input<number>(3);
  hint = input<string>();
  error = input<string>();
  size = input<'sm' | 'md' | 'lg'>('md');

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
    const input = event.target as HTMLTextAreaElement;
    this.value.set(input.value);
    this.onChange(input.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
