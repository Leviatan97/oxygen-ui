import { Component, input, output, signal, ViewEncapsulation, forwardRef, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'ox-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="oxy-otp-container" [class.oxy-otp--disabled]="disabled()">
      @for (i of [0, 1, 2, 3, 4, 5].slice(0, length()); track i) {
        <input
          #otpInput
          type="text"
          maxlength="1"
          class="oxy-otp-input"
          [disabled]="disabled()"
          [value]="otpValues()[i] || ''"
          (input)="onInputChange($event, i)"
          (keydown)="onKeyDown($event, i)"
          (paste)="onPaste($event)"
        />
      }
    </div>
  `,
  styleUrl: './otp.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OtpComponent),
      multi: true
    }
  ]
})
export class OtpComponent implements ControlValueAccessor {
  length = input<number>(6);
  disabled = input<boolean>(false);
  
  @ViewChildren('otpInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;
  
  otpValues = signal<string[]>([]);
  
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    const val = value || '';
    this.otpValues.set(val.split('').slice(0, this.length()));
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const val = input.value;
    
    // Solo actualizar el array de valores locales antes de updateValue
    const currentValues = this.otpValues();
    currentValues[index] = val;
    this.otpValues.set([...currentValues]);

    if (val && index < this.length() - 1) {
      this.inputs.toArray()[index + 1].nativeElement.focus();
    }
    
    this.updateValue();
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otpValues()[index] && index > 0) {
      this.inputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const data = event.clipboardData?.getData('text');
    if (!data) return;
    
    const chars = data.split('').slice(0, this.length());
    this.otpValues.set(chars);
    this.updateValue();
    
    const nextIndex = Math.min(chars.length, this.length() - 1);
    this.inputs.toArray()[nextIndex].nativeElement.focus();
  }

  private updateValue() {
    const inputsArray = this.inputs.toArray();
    const currentValues = inputsArray.map(el => el.nativeElement.value);
    this.otpValues.set(currentValues);
    const fullValue = currentValues.join('');
    this.onChange(fullValue);
  }
}
