import { Component, forwardRef, input, model, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ox-input-switch',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="ox-input-switch" 
      [class.ox-input-switch-checked]="checked()" 
      [class.ox-input-switch-disabled]="disabled()"
      (click)="toggle($event)">
      <div class="ox-input-switch-slider"></div>
    </div>
  `,
  styleUrl: './input-switch.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSwitchComponent),
      multi: true
    }
  ]
})
export class InputSwitchComponent implements ControlValueAccessor {
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
