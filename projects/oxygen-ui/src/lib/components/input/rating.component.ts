import { Component, input, model, forwardRef, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ox-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="oxy-rating" [class.oxy-rating--disabled]="disabled()">
      @for (star of [1, 2, 3, 4, 5].slice(0, max()); track star) {
        <button 
          type="button" 
          class="oxy-star" 
          [class.oxy-star--active]="star <= (hoverValue() || value())"
          [disabled]="disabled()"
          (mouseenter)="onMouseEnter(star)"
          (mouseleave)="onMouseLeave()"
          (click)="onSelect(star)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
          </svg>
        </button>
      }
    </div>
  `,
  styleUrl: './rating.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true
    }
  ]
})
export class RatingComponent implements ControlValueAccessor {
  max = input<number>(5);
  disabled = input<boolean>(false);
  value = model<number>(0);
  
  hoverValue = signal<number>(0);

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  onSelect(val: number) {
    if (this.disabled()) return;
    const newValue = this.value() === val ? 0 : val;
    this.value.set(newValue);
    this.onChange(newValue);
    this.onTouched();
  }

  onMouseEnter(val: number) {
    if (this.disabled()) return;
    this.hoverValue.set(val);
  }

  onMouseLeave() {
    this.hoverValue.set(0);
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
