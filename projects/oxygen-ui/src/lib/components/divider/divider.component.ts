import { Component, input, ElementRef, HostListener, computed, signal, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerLabelPosition = 'start' | 'center' | 'end';
export type DividerBorderStyle = 'solid' | 'dashed' | 'dotted' | 'double';

@Component({
  selector: 'ox-divider',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (label()) {
      <span class="ox-divider__label" [style.font-weight]="labelFontWeight()">{{ label() }}</span>
    }
  `,
  styleUrl: './divider.component.scss',
  host: {
    '[class.ox-divider--horizontal]': 'isHorizontal()',
    '[class.ox-divider--vertical]': '!isHorizontal()',
    '[class.ox-divider--resizable]': 'resizable()',
    '[class.ox-divider--has-label]': 'hasLabel()',
    '[class.ox-divider--label-start]': 'labelPosition() === "start"',
    '[class.ox-divider--label-center]': 'labelPosition() === "center"',
    '[class.ox-divider--label-end]': 'labelPosition() === "end"',
    '[style.--ox-divider-style]': 'borderStyle()',
    'role': 'separator',
    '[attr.aria-orientation]': 'orientation()'
  }
})
export class DividerComponent {
  orientation = input<DividerOrientation>('horizontal');
  label = input<string>();
  labelPosition = input<DividerLabelPosition>('center');
  labelFontWeight = input<string | number>('normal');
  borderStyle = input<DividerBorderStyle>('solid');
  resizable = input<boolean>(false);
  thickness = input<string>('1px');
  color = input<string>('var(--ox-border-color, #e0e0e0)');

  isHorizontal = computed(() => this.orientation() === 'horizontal');
  hasLabel = computed(() => !!this.label());

  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private startSize = 0;
  private targetElement: HTMLElement | null = null;

  @HostBinding('attr.tabindex')
  get tabindex() {
    return this.resizable() ? 0 : -1;
  }

  @HostBinding('attr.aria-valuenow')
  get ariaValueNow() {
    return this.currentSize;
  }
  
  // Track current size for ARIA
  private currentSize = 0;

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.resizable()) return;

    const isHorizontal = this.isHorizontal();
    let delta = 0;
    const step = 10; // Pixels per keypress

    switch(event.key) {
      case 'ArrowUp':
        if (isHorizontal) delta = -step;
        break;
      case 'ArrowDown':
        if (isHorizontal) delta = step;
        break;
      case 'ArrowLeft':
        if (!isHorizontal) delta = -step;
        break;
      case 'ArrowRight':
        if (!isHorizontal) delta = step;
        break;
      default:
        return; // Other keys propagate
    }

    if (delta !== 0) {
      event.preventDefault(); // Prevent scroll
      this.performResize(delta, true); // true = relative to current
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (!this.resizable()) return;

    event.preventDefault(); // Prevent text selection
    this.isDragging = true;
    this.startX = event.clientX;
    this.startY = event.clientY;

    // Identify target (previous sibling)
    const prev = this.el.nativeElement.previousElementSibling;
    if (prev) {
        this.targetElement = prev as HTMLElement;
        const styles = window.getComputedStyle(this.targetElement);
        this.startSize = this.isHorizontal() ? parseFloat(styles.height) : parseFloat(styles.width);
        this.currentSize = this.startSize;
        
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        document.body.style.cursor = this.isHorizontal() ? 'row-resize' : 'col-resize';
        document.body.style.userSelect = 'none'; 
    }
  }

  private onMouseMove = (event: MouseEvent) => {
    if (!this.isDragging || !this.targetElement) return;

    let delta = 0;
    if (this.isHorizontal()) {
        delta = event.clientY - this.startY;
    } else {
        delta = event.clientX - this.startX;
    }
    
    // Perform resize relative to drag START
    this.performResize(delta, false);
  };

  private performResize(delta: number, isRelative: boolean) {
    // If we are doing keyboard resize (isRelative=true), we need to re-fetch target/size if not cached
    if (!this.targetElement) {
       const prev = this.el.nativeElement.previousElementSibling;
       if (!prev) return;
       this.targetElement = prev as HTMLElement;
       const styles = window.getComputedStyle(this.targetElement);
       // For relative (keyboard), startSize becomes current size
       this.startSize = this.isHorizontal() ? parseFloat(styles.height) : parseFloat(styles.width);
    }

    const base = isRelative ? this.runnningSize() : this.startSize;
    const newSize = Math.max(10, base + delta);
    
    // Update DOM
    if (this.isHorizontal()) {
      this.targetElement.style.height = `${newSize}px`;
    } else {
      this.targetElement.style.width = `${newSize}px`;
    }
    this.targetElement.style.flex = 'none';

    // Update state
    this.currentSize = newSize;

    // If relative, update the 'running base' for next keypress
    if (isRelative) {
        // Technically for keyboard 'delta' is always small step from CURRENT.
        // So 'base' should be current computed style? 
        // Let's simplify: simply use style.height/width?
        // But runningSize() helper might be cleaner.
    }
  }
  
  // Helper to get current size from DOM, to support consecutive key presses
  private runnningSize(): number {
     if (!this.targetElement) return 0;
     // simple read from style if set, else computed
     return this.isHorizontal() 
        ? parseFloat(this.targetElement.style.height || window.getComputedStyle(this.targetElement).height) 
        : parseFloat(this.targetElement.style.width || window.getComputedStyle(this.targetElement).width);
  }

  private onMouseUp = () => {
    this.isDragging = false;
    this.targetElement = null; // Clear target on mouse up
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };
}
