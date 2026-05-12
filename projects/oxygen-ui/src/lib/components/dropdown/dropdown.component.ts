import { Component, forwardRef, input, model, ChangeDetectionStrategy, ViewEncapsulation, signal, computed, inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

export interface DropdownOption<T = unknown> {
  label: string;
  value: T;
  disabled?: boolean;
}

@Component({
  selector: 'ox-dropdown',
  standalone: true,
  imports: [CommonModule, OverlayModule, FormsModule, NgClass],
  template: `
    <div 
      #container
      class="ox-dropdown" 
      [class.ox-dropdown-open]="isOpen()" 
      [class.ox-dropdown-disabled]="disabled()"
      [class.ox-dropdown-has-label]="!!label()"
      [ngClass]="[
        'ox-dropdown-' + size(),
        'ox-dropdown-' + variant(),
        'ox-dropdown-' + severity()
      ]"
      (click)="toggle()">
      
      @if (variant() === 'fieldset' && label()) {
        <label class="ox-dropdown-fieldset-label">{{ label() }}</label>
      }

      <div class="ox-dropdown-label">
        {{ selectedLabel() || placeholder() }}
      </div>
      
      <div class="ox-dropdown-trigger">
        <svg viewBox="0 0 20 20" fill="currentColor" class="ox-dropdown-trigger-icon">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </div>

      <ng-template 
        cdkConnectedOverlay 
        [cdkConnectedOverlayOrigin]="container" 
        [cdkConnectedOverlayOpen]="isOpen()"
        [cdkConnectedOverlayMinWidth]="containerWidth"
        [cdkConnectedOverlayOffsetY]="4"
        (overlayOutsideClick)="close()">
        
        <div class="ox-dropdown-panel ox-elevation-2">
          @if (filter()) {
            <div class="ox-dropdown-filter-container" (click)="$event.stopPropagation()">
              <input 
                type="text" 
                class="ox-dropdown-filter-input" 
                [placeholder]="filterPlaceholder()"
                [(ngModel)]="filterValue"
                (input)="onFilterChange()">
            </div>
          }
          <ul class="ox-dropdown-items">
            @for (option of filteredOptions(); track option.value) {
              <li 
                class="ox-dropdown-item" 
                [class.ox-dropdown-item-selected]="isSelected(option)"
                [class.ox-dropdown-item-disabled]="option.disabled"
                (click)="selectOption(option, $event)">
                {{ option.label }}
              </li>
            } @empty {
              <li class="ox-dropdown-empty-message">{{ emptyMessage() }}</li>
            }
          </ul>
        </div>
      </ng-template>
    </div>
  `,
  styleUrl: './dropdown.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent<T = unknown> implements ControlValueAccessor {
  @ViewChild('container') container!: ElementRef;
  
  options = input<DropdownOption<T>[]>([]);
  label = input<string>();
  placeholder = input<string>('Select an option');
  disabled = input<boolean>(false);
  filter = input<boolean>(false);
  filterPlaceholder = input<string>('Search...');
  emptyMessage = input<string>('No results found');
  size = input<'sm' | 'md' | 'lg'>('md');
  variant = input<'default' | 'filled' | 'outlined' | 'fieldset' | 'oneLine'>('default');
  severity = input<'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'>('primary');
  
  value = model<T | null>(null);
  
  isOpen = signal(false);
  filterValue = signal('');
  containerWidth = 0;

  filteredOptions = computed(() => {
    const term = this.filterValue().toLowerCase();
    if (!term) return this.options();
    return this.options().filter(o => o.label.toLowerCase().includes(term));
  });

  selectedLabel = computed(() => {
    const currentVal = this.value();
    const selected = this.options().find(o => JSON.stringify(o.value) === JSON.stringify(currentVal));
    return selected ? selected.label : null;
  });

  private onChange: (value: T | null) => void = () => {};
  private onTouched: () => void = () => {};

  toggle() {
    if (this.disabled()) return;
    if (!this.isOpen()) {
      this.containerWidth = this.container.nativeElement.offsetWidth;
    }
    this.isOpen.update(v => !v);
  }

  close() {
    this.isOpen.set(false);
    this.filterValue.set('');
  }

  selectOption(option: DropdownOption<T>, event: Event) {
    event.stopPropagation();
    if (option.disabled) return;
    
    this.value.set(option.value);
    this.onChange(option.value);
    this.onTouched();
    this.close();
  }

  isSelected(option: DropdownOption<T>): boolean {
    return JSON.stringify(option.value) === JSON.stringify(this.value());
  }

  onFilterChange() {
    // Handled by signal binding
  }

  writeValue(value: T): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handled by input signal
  }
}
