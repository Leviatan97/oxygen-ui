import { Component, Directive, input, model, computed, contentChild, TemplateRef, ElementRef, ViewChild, effect, viewChild, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
  selector: '[oxCardHeader]',
  standalone: true
})
export class OxCardHeaderDirective {}

@Directive({
  selector: '[oxCardBody]',
  standalone: true
})
export class OxCardBodyDirective {}

@Directive({
  selector: '[oxCardFooter]',
  standalone: true
})
export class OxCardFooterDirective {}

@Directive({
  selector: '[oxCardBack]',
  standalone: true
})
export class OxCardBackDirective {}

@Directive({
  selector: '[oxCardBackHeader]',
  standalone: true
})
export class OxCardBackHeaderDirective {}

@Directive({
  selector: '[oxCardBackBody]',
  standalone: true
})
export class OxCardBackBodyDirective {}

@Directive({
  selector: '[oxCardBackFooter]',
  standalone: true
})
export class OxCardBackFooterDirective {}

@Component({
  selector: 'ox-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  host: {
    '[class]': 'hostClasses()',
    '[style.--ox-card-shadow]': 'shadowValue()',
    '[class.ox-card--flipped]': 'flipped()',
    '[class.ox-card--animating]': 'isAnimating()',
    'role': 'article'
  }
})
export class CardComponent {
  boxShadow = input<'sm' | 'md' | 'lg' | 'none'>('sm');
  bordered = input<boolean>(true);
  hoverable = input<boolean>(false);
  liftOnHover = input<boolean>(false);
  flipped = model<boolean>(false);
  
  isAnimating = signal<boolean>(false);

  header = contentChild(OxCardHeaderDirective);
  body = contentChild(OxCardBodyDirective);
  footer = contentChild(OxCardFooterDirective);
  
  back = contentChild(OxCardBackDirective);
  backHeader = contentChild(OxCardBackHeaderDirective);
  backBody = contentChild(OxCardBackBodyDirective);
  backFooter = contentChild(OxCardBackFooterDirective);

  hasBack = computed(() => !!this.back() || !!this.backHeader() || !!this.backBody() || !!this.backFooter());

  frontContainer = viewChild<ElementRef<HTMLElement>>('frontSide');
  backContainer = viewChild<ElementRef<HTMLElement>>('backSide');

  constructor() {
    effect((onCleanup) => {
      const isFlipped = this.flipped();
      
      // Trigger animation state
      untracked(() => {
        this.isAnimating.set(true);
      });
      
      const timer = setTimeout(() => {
        untracked(() => {
            this.isAnimating.set(false);
        });

        // Focus management logic (moved here to align with animation end)
        const target = isFlipped ? this.backContainer() : this.frontContainer();
        if (target) {
          const focusable = target.nativeElement.querySelector('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement;
          if (focusable) {
            focusable.focus();
          }
        }
      }, 600); // Full 0.6s transition

      onCleanup(() => clearTimeout(timer));
    });
  }

  hostClasses = computed(() => {
    return [
      'ox-card',
      this.bordered() ? 'ox-card--bordered' : '',
      this.hoverable() ? 'ox-card--hoverable' : '',
      this.liftOnHover() ? 'ox-card--lift' : ''
    ].filter(Boolean).join(' ');
  });

  shadowValue = computed(() => {
    if (this.boxShadow() === 'none') return 'none';
    return `var(--shadow-${this.boxShadow()})`;
  });
}
