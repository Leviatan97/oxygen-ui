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

  private lastSyncedExpandedStates: boolean[] = [];
  private isSyncing = false;

  constructor() {
    effect(() => {
      // 1. Dependencies - Reading these registers them as dependencies
      const active = this.activeId();
      const items = this.items();
      const multi = this.multi();
      // Track items items and expansions to detect change
      const itemExpandedStates = items.map(item => item.expanded());

      untracked(() => {
        if (this.isSyncing) return;
        this.isSyncing = true;

        try {
          // Normalize model value to array of strings for easier comparison
          const modelActiveIds = this.normalizeActiveIds(active);
          
          // Get current view state (expanded items)
          const viewActiveIds = items
            .filter(item => item.expanded())
            .map(item => item.itemId());

          // Check if View changed since last sync
          const viewChanged = !this.arraysEqual(itemExpandedStates, this.lastSyncedExpandedStates);

          if (viewChanged) {
            // CASE 1: User Interaction (View -> Model)
            // The user clicked something, causing expanded state to change.
            
            if (!multi) {
              // Single Mode logic
              // Identify the 'newly opened' item if any.
              // Since we know view changed, find the item that is Expanded NOW but was NOT expanded BEFORE.
              const newlyOpenedIndex = itemExpandedStates.findIndex((exp, i) => exp && !this.lastSyncedExpandedStates[i]);
              
              if (newlyOpenedIndex !== -1) {
                // User opened an item. Close others.
                const newlyOpenedItem = items[newlyOpenedIndex];
                
                // Close everyone else
                items.forEach((item, index) => {
                  if (index !== newlyOpenedIndex && item.expanded()) {
                    item.expanded.set(false);
                  }
                });
                
                this.activeId.set(newlyOpenedItem.itemId());
              } else {
                // User closed the active item (or all were closed).
                // Ensure activeId is null
                this.activeId.set(null);
              }

            } else {
              // Multi Mode logic: Simple Sync View -> Model
              this.activeId.set(viewActiveIds);
            }

          } else {
             // CASE 2: External Update (Model -> View) (or initialization)
             // The view didn't change (user didn't click), so the 'activeId' must have changed externally.
             
             // Check if we even need to update anything (Model vs View content match)
             const areContentEqual = this.areSetsEqual(modelActiveIds, viewActiveIds);
             
             if (!areContentEqual) {
                // Force View to match Model
                items.forEach(item => {
                  const shouldBeOpen = modelActiveIds.includes(item.itemId());
                  if (item.expanded() !== shouldBeOpen) {
                    item.expanded.set(shouldBeOpen);
                  }
                });
             }
          }

          // Update our history tracker
          // Re-read expanded signals just in case we changed them above? 
          // Actually, we should start tracking exactly what the DOM/Signal state is NOW.
          this.lastSyncedExpandedStates = items.map(i => i.expanded());

        } finally {
          this.isSyncing = false;
        }
      });
    });
  }

  private normalizeActiveIds(active: string | string[] | null): string[] {
    if (active === null || active === undefined) return [];
    if (Array.isArray(active)) return active;
    return [active];
  }

  private arraysEqual(a: boolean[], b: boolean[]): boolean {
    if (a.length !== b.length) return false;
    if (a.length === 0 && b.length === 0) return true; // Start state might be empty
    return a.every((val, i) => val === b[i]);
  }

  private areSetsEqual(a: string[], b: string[]): boolean {
    if (a.length !== b.length) return false;
    const setA = new Set(a);
    return b.every(val => setA.has(val));
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

}
