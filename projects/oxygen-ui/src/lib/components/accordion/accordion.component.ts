import { Component, input, contentChildren, effect, untracked, computed, signal, model, HostListener } from '@angular/core';
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
    '[style.--ox-accordion-border-radius]': 'borderRadius() || "var(--ox-border-radius, 8px)"',
    '[style.--ox-accordion-border-width]': 'borderWidth()'
  }
})
export class AccordionComponent {
  multi = input<boolean>(false);
  bordered = input<boolean>(true);
  borderRadius = input<string>();
  activeId = model<string | string[] | null>(null);
  items = contentChildren(AccordionItemComponent);

  hostClasses = computed(() => {
    return [
      'ox-accordion-host',
      this.bordered() ? 'ox-accordion--bordered' : 'ox-accordion--no-border'
    ].filter(Boolean).join(' ');
  });

  borderWidth = computed(() => this.bordered() ? '1px' : '0px');

  private lastExpandedItem = signal<AccordionItemComponent | null>(null);

  constructor() {
    effect(() => {
      // 1. Dependencies
      const active = this.activeId();
      const items = this.items();
      const multi = this.multi();
      
      // Track items expansions to detect manual clicks
      const itemExpandedStates = items.map(item => item.expanded());
      const itemIds = items.map(item => item.itemId());

      untracked(() => {
        const lastExpanded = this.lastExpandedItem();
        
        // A) Detection: Did a user just open an item manually?
        // We find an item that is expanded but wasn't the lastExpanded one
        const newlyOpened = items.find(item => item.expanded() && item !== lastExpanded);

        if (newlyOpened && !this.isSyncing) {
          this.isSyncing = true;
          if (!multi) {
            // Force exclusivity
            items.forEach(item => {
              if (item !== newlyOpened && item.expanded()) {
                item.expanded.set(false);
              }
            });
            this.activeId.set(newlyOpened.itemId());
          } else {
            const currentActiveIds = items
              .filter(i => i.expanded())
              .map(i => i.itemId());
            this.activeId.set(currentActiveIds);
          }
          this.lastExpandedItem.set(newlyOpened);
          this.isSyncing = false;
          return;
        }

        // B) Detection: Did a user just close all items?
        const anyExpanded = items.some(i => i.expanded());
        if (!anyExpanded && lastExpanded !== null && !this.isSyncing) {
          this.isSyncing = true;
          this.activeId.set(multi ? [] : null);
          this.lastExpandedItem.set(null);
          this.isSyncing = false;
          return;
        }

        // C) Downward Sync: External activeId changed OR Initialization
        this.isSyncing = true;
        items.forEach(item => {
          const shouldBeOpen = multi
            ? Array.isArray(active) && active.includes(item.itemId())
            : active === item.itemId();
          
          if (item.expanded() !== shouldBeOpen) {
            item.expanded.set(shouldBeOpen);
          }
        });
        
        // Update tracking post-sync
        if (!multi) {
          const currentActive = items.find(i => i.itemId() === active);
          this.lastExpandedItem.set(currentActive || null);
        }
        this.isSyncing = false;
      });
    });
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const items = this.items() || [];
    const enabledItems = items.filter(item => !item.disabled());
    if (enabledItems.length === 0) return;

    // Find the currently focused header among our items
    const activeElement = document.activeElement;
    const currentIndex = enabledItems.findIndex(item => item.headerButton()?.nativeElement === activeElement);

    if (currentIndex === -1 && !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % enabledItems.length;
        enabledItems[nextIndex].focusHeader();
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length;
        enabledItems[prevIndex].focusHeader();
        break;
      case 'Home':
        event.preventDefault();
        enabledItems[0].focusHeader();
        break;
      case 'End':
        event.preventDefault();
        enabledItems[enabledItems.length - 1].focusHeader();
        break;
    }
  }

  private isSyncing = false;
}
