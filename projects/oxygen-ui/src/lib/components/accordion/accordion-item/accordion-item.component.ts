import { Component, input, model, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AccordionColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type AccordionVariantPrefix = 'outline' | 'ghost';
export type AccordionVariant = AccordionColor | `${AccordionVariantPrefix}-${AccordionColor}`;

@Component({
  selector: 'ox-accordion-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.scss'
})
export class AccordionItemComponent {
  private static nextId = 0;
  private readonly uniqueId = `ox-accordion-item-${AccordionItemComponent.nextId++}`;

  title = input<string>('');
  expanded = model<boolean>(false);
  color = input<AccordionVariant>();
  headingLevel = input<number>(3);
  id = input<string>(this.uniqueId);

  headerId = computed(() => `${this.id()}-header`);
  panelId = computed(() => `${this.id()}-panel`);

  headerClasses = computed(() => {
    return [
      'ox-accordion-item__header',
      this.color() ? `ox-accordion-item__header--${this.color()}` : ''
    ].filter(Boolean).join(' ');
  });

  toggle(): void {
    this.expanded.update(v => !v);
  }
}
