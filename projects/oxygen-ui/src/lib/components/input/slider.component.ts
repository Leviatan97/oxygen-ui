import { Component, input, model, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ox-slider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="oxy-slider-wrapper" [class.oxy-slider--disabled]="disabled()">
      <input 
        type="range" 
        [min]="min()" 
        [max]="max()" 
        [step]="step()" 
        [value]="value()"
        [disabled]="disabled()"
        (input)="onInput($event)"
        class="oxy-slider-input"
        [style.--progress]="progress() + '%'">
      
      @if (showValues()) {
        <div class="oxy-slider-values">
          <span class="oxy-slider-min">{{ min() }}</span>
          <span class="oxy-slider-current">{{ value() }}</span>
          <span class="oxy-slider-max">{{ max() }}</span>
        </div>
      }
    </div>
  `,
  styleUrl: './slider.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true
    }
  ]
})
export class SliderComponent implements ControlValueAccessor {
  min = input<number>(0);
  max = input<number>(100);
  step = input<number>(1);
  disabled = input<boolean>(false);
  showValues = input<boolean>(true);
  
  value = model<number>(0);

  progress = () => {
    const range = this.max() - this.min();
    return ((this.value() - this.min()) / range) * 100;
  };

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  onInput(event: Event) {
    const val = Number((event.target as HTMLInputElement).value);
    this.value.set(val);
    this.onChange(val);
  }

  writeValue(value: number): void {
    this.value.set(value || 0);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
