import { Component, input, contentChildren, effect, untracked, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';

@Component({
  selector: 'ox-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  host: {
    '[class]': 'hostClasses()',
    '[style.border-radius]': 'borderRadius()',
    '[style.--ox-accordion-border-radius]': 'borderRadius() || "var(--ox-border-radius, 8px)"'
  }
})
export class AccordionComponent {
  multi = input<boolean>(false);
  borderRadius = input<string>();
  boxShadow = input<'sm' | 'md' | 'none'>('none');
  items = contentChildren(AccordionItemComponent);

  hostClasses = computed(() => {
    return [
      'ox-accordion-host',
      `ox-accordion--shadow-${this.boxShadow()}`
    ].filter(Boolean).join(' ');
  });

  private lastExpandedItem = signal<AccordionItemComponent | null>(null);

  constructor() {
    effect(() => {
      // Return early if multi-selection is enabled
      if (this.multi()) return;

      const items = this.items();
      const expandedItems = items.filter(item => item.expanded());

      if (expandedItems.length > 1) {
        // Find which item was just opened (the one that wasn't the last recorded expanded item)
        const newlyOpened = expandedItems.find(item => item !== untracked(this.lastExpandedItem));

        if (newlyOpened) {
          untracked(() => {
            // Close all other items explicitly
            items.forEach(item => {
              if (item !== newlyOpened && item.expanded()) {
                item.expanded.set(false);
              }
            });
            // Update the tracker
            this.lastExpandedItem.set(newlyOpened);
          });
        }
      } else if (expandedItems.length === 1) {
        // Synchronize our tracker if there's only one item open
        untracked(() => this.lastExpandedItem.set(expandedItems[0]));
      } else {
        // No items open, reset tracker
        untracked(() => this.lastExpandedItem.set(null));
      }
    });
  }
}
