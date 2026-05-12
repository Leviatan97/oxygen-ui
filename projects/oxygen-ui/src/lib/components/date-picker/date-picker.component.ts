import { Component, forwardRef, input, signal, ViewEncapsulation, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'ox-date-picker',
  standalone: true,
  imports: [CommonModule, OverlayModule, FormsModule],
  template: `
    <div class="oxy-input-wrapper" 
         [class.oxy-input-wrapper--disabled]="disabled()"
         [class.oxy-input-wrapper--error]="!!error()"
         [class.oxy-input-wrapper--float]="floatLabel()"
         [class.oxy-input-wrapper--has-value]="!!value()"
         [class.oxy-input-wrapper--open]="isOpen()"
         [ngClass]="[
           'oxy-input-wrapper--' + size(),
           variant() === 'fieldset' ? 'oxy-input-wrapper--fieldset' : '',
           variant() === 'oneLine' ? 'oxy-input-wrapper--oneLine' : ''
         ]">
      
      @if (label()) {
        <label class="oxy-input-label" (click)="toggle()">
          {{ label() }}
          @if (required()) {
            <span class="oxy-input-required">*</span>
          }
        </label>
      }

      <div class="oxy-input-container" cdkOverlayOrigin #trigger="cdkOverlayOrigin" (click)="toggle()">
        <input
          [id]="id()"
          type="text"
          [value]="formattedValue()"
          [disabled]="disabled()"
          [placeholder]="placeholder() || ''"
          readonly
          class="oxy-input-field oxy-datepicker-input"
        />
        <div class="oxy-datepicker-trigger">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
      </div>

      @if (error()) {
        <div class="oxy-input-error" role="alert">{{ error() }}</div>
      } @else if (hint()) {
        <div class="oxy-input-hint">{{ hint() }}</div>
      }

      <ng-template 
        cdkConnectedOverlay 
        [cdkConnectedOverlayOrigin]="trigger" 
        [cdkConnectedOverlayOpen]="isOpen()"
        [cdkConnectedOverlayOffsetY]="4"
        (overlayOutsideClick)="close()">
        
        <div class="oxy-datepicker-panel oxy-elevation-4">
          <div class="oxy-datepicker-header">
            <button type="button" (click)="prev()" class="oxy-datepicker-nav-btn">&lt;</button>
            <span class="oxy-datepicker-month-year" (click)="toggleView()">
              @if (currentView() === 'days') {
                {{ currentMonthName() }} {{ currentYear() }}
              } @else if (currentView() === 'months') {
                {{ currentYear() }}
              } @else {
                {{ yearsRange()[1] }} - {{ yearsRange()[yearsRange().length - 2] }}
              }
            </span>
            <button type="button" (click)="next()" class="oxy-datepicker-nav-btn">&gt;</button>
          </div>
          
          @if (currentView() === 'days') {
            <div class="oxy-datepicker-calendar">
              <div class="oxy-datepicker-weekdays">
                @for (day of weekDays; track day) {
                  <span class="oxy-datepicker-weekday">{{ day }}</span>
                }
              </div>
              <div class="oxy-datepicker-days">
                @for (date of calendarDays(); track date.getTime()) {
                  <div 
                    class="oxy-datepicker-day"
                    [class.oxy-datepicker-day--other-month]="!isCurrentMonth(date)"
                    [class.oxy-datepicker-day--today]="isToday(date)"
                    [class.oxy-datepicker-day--selected]="isSelected(date)"
                    (click)="selectDate(date)">
                    {{ date.getDate() }}
                  </div>
                }
              </div>
            </div>
          } @else if (currentView() === 'months') {
            <div class="oxy-datepicker-grid oxy-datepicker-months">
              @for (month of monthNames; track month; let i = $index) {
                <div 
                  class="oxy-datepicker-grid-item"
                  [class.oxy-datepicker-grid-item--selected]="viewDate().getMonth() === i"
                  (click)="selectMonth(i)">
                  {{ month.substring(0, 3) }}
                </div>
              }
            </div>
          } @else if (currentView() === 'years') {
            <div class="oxy-datepicker-grid oxy-datepicker-years">
              @for (year of yearsRange(); track year; let i = $index) {
                <div 
                  class="oxy-datepicker-grid-item"
                  [class.oxy-datepicker-grid-item--other]="i === 0 || i === yearsRange().length - 1"
                  [class.oxy-datepicker-grid-item--selected]="viewDate().getFullYear() === year"
                  (click)="selectYear(year)">
                  {{ year }}
                </div>
              }
            </div>
          }

          <div class="oxy-datepicker-footer">
            <button type="button" (click)="clear()" class="oxy-datepicker-btn oxy-datepicker-btn--text">Borrar</button>
            <button type="button" (click)="setToday()" class="oxy-datepicker-btn oxy-datepicker-btn--text">Hoy</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  styleUrl: './date-picker.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements ControlValueAccessor {
  id = input<string>(`oxy-datepicker-${Math.random().toString(36).substr(2, 9)}`);
  label = input<string>();
  placeholder = input<string>();
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  hint = input<string>();
  error = input<string>();
  size = input<'sm' | 'md' | 'lg'>('md');
  floatLabel = input<boolean>(false);
  variant = input<'default' | 'fieldset' | 'oneLine'>('default');
  format = input<string>('DD/MM/YYYY');

  value = signal<Date | null>(null);
  isOpen = signal(false);
  viewDate = signal(new Date());
  currentView = signal<'days' | 'months' | 'years'>('days');

  weekDays = ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'];
  monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  currentYear = computed(() => this.viewDate().getFullYear());
  currentMonthName = computed(() => this.monthNames[this.viewDate().getMonth()]);
  
  yearsRange = computed(() => {
    const startYear = Math.floor(this.currentYear() / 10) * 10;
    const years = [];
    for (let i = -1; i < 11; i++) {
      years.push(startYear + i);
    }
    return years;
  });

  formattedValue = computed(() => {
    const date = this.value();
    if (!date) return '';
    
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();

    return this.format()
      .replace('DD', d)
      .replace('MM', m)
      .replace('YYYY', y.toString());
  });

  calendarDays = computed(() => {
    const year = this.currentYear();
    const month = this.viewDate().getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days: Date[] = [];
    const startOffset = firstDay.getDay();
    
    // Fill previous month days
    for (let i = startOffset; i > 0; i--) {
      days.push(new Date(year, month, 1 - i));
    }
    
    // Fill current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    // Fill next month days to complete 6 weeks (42 days)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  });

  private onChange: (value: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value) {
      const date = value instanceof Date ? value : new Date(value);
      this.value.set(isNaN(date.getTime()) ? null : date);
    } else {
      this.value.set(null);
    }
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  toggle() {
    if (this.disabled()) return;
    this.isOpen.set(!this.isOpen());
    if (this.isOpen()) {
       this.currentView.set('days');
       if (this.value()) {
         this.viewDate.set(new Date(this.value()!));
       }
    }
  }

  close() { 
    this.isOpen.set(false);
    this.currentView.set('days');
  }

  prev() {
    const d = this.viewDate();
    if (this.currentView() === 'days') {
      this.viewDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
    } else if (this.currentView() === 'months') {
      this.viewDate.set(new Date(d.getFullYear() - 1, d.getMonth(), 1));
    } else {
      this.viewDate.set(new Date(d.getFullYear() - 10, d.getMonth(), 1));
    }
  }

  next() {
    const d = this.viewDate();
    if (this.currentView() === 'days') {
      this.viewDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
    } else if (this.currentView() === 'months') {
      this.viewDate.set(new Date(d.getFullYear() + 1, d.getMonth(), 1));
    } else {
      this.viewDate.set(new Date(d.getFullYear() + 10, d.getMonth(), 1));
    }
  }

  toggleView() {
    if (this.currentView() === 'days') {
      this.currentView.set('months');
    } else if (this.currentView() === 'months') {
      this.currentView.set('years');
    }
  }

  selectMonth(month: number) {
    const d = this.viewDate();
    this.viewDate.set(new Date(d.getFullYear(), month, 1));
    this.currentView.set('days');
  }

  selectYear(year: number) {
    const d = this.viewDate();
    this.viewDate.set(new Date(year, d.getMonth(), 1));
    this.currentView.set('months');
  }

  selectDate(date: Date) {
    this.value.set(date);
    this.onChange(date);
    this.close();
  }

  setToday() {
    const today = new Date();
    this.selectDate(today);
  }

  clear() {
    this.value.set(null);
    this.onChange(null);
    this.close();
  }

  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.viewDate().getMonth();
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  isSelected(date: Date): boolean {
    const current = this.value();
    if (!current) return false;
    return date.getDate() === current.getDate() &&
           date.getMonth() === current.getMonth() &&
           date.getFullYear() === current.getFullYear();
  }
}
