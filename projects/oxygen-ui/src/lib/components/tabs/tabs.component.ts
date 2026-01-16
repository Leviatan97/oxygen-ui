import { Component, contentChildren, signal, computed, viewChildren, viewChild, ElementRef, effect, input, model } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { TabComponent } from './tab.component';

@Component({
  selector: 'ox-tabs',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  host: {
    '[class]': '"ox-tabs--" + color()'
  }
})
export class TabsComponent {
  tabs = contentChildren(TabComponent);
  tabButtons = viewChildren<ElementRef>('tabButton');
  headerContainer = viewChild.required<ElementRef>('headerContainer');
  
  color = input<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'>('primary');
  
  // Two-way binding for active index
  activeIndex = model(0);
  
  indicatorLeft = signal(0);
  indicatorWidth = signal(0);

  showLeftArrow = signal(false);
  showRightArrow = signal(false);

  constructor() {
    effect(() => {
      // Recalculate indicator when activeIndex or tabButtons change
      const index = this.activeIndex();
      const buttons = this.tabButtons();
      
      if (buttons && buttons[index]) {
        const element = buttons[index].nativeElement;
        this.indicatorLeft.set(element.offsetLeft);
        this.indicatorWidth.set(element.offsetWidth);
        
        // Also ensure active tab is scrolled into view
        this.scrollToTab(element);
      }
    });
  }

  next() {
    const tabs = this.tabs();
    const current = this.activeIndex();
    if (current < tabs.length - 1) {
      // Find next non-disabled tab
      for (let i = current + 1; i < tabs.length; i++) {
        if (!tabs[i].disabled()) {
          this.activeIndex.set(i);
          break;
        }
      }
    }
  }

  previous() {
    const current = this.activeIndex();
    if (current > 0) {
      // Find previous non-disabled tab
      const tabs = this.tabs();
      for (let i = current - 1; i >= 0; i--) {
        if (!tabs[i].disabled()) {
          this.activeIndex.set(i);
          break;
        }
      }
    }
  }

  ngAfterViewInit() {
    this.checkScroll();
  }

  checkScroll() {
    const element = this.headerContainer().nativeElement;
    this.showLeftArrow.set(element.scrollLeft > 0);
    this.showRightArrow.set(
      Math.ceil(element.scrollLeft + element.clientWidth) < element.scrollWidth
    );
  }

  scrollHeader(direction: 'left' | 'right') {
    const element = this.headerContainer().nativeElement;
    const scrollAmount = 200; // Scroll amount in pixels
    
    if (direction === 'left') {
      element.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      element.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
    
    // Check scroll after animation (timeout is a simple way, usually IntersectionObserver is better but this suffices for click)
    setTimeout(() => this.checkScroll(), 350); 
  }

  onScroll() {
    this.checkScroll();
  }
  
  scrollToTab(element: HTMLElement) {
      const container = this.headerContainer().nativeElement;
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const elementLeft = element.offsetLeft;
      const elementWidth = element.offsetWidth;

      if (elementLeft < scrollLeft) {
          container.scrollTo({ left: elementLeft, behavior: 'smooth' });
      } else if (elementLeft + elementWidth > scrollLeft + containerWidth) {
          container.scrollTo({ left: elementLeft + elementWidth - containerWidth, behavior: 'smooth' });
      }
  }

  activeTab = computed(() => {
    const tabs = this.tabs();
    // Safety check just in case
    if (!tabs || tabs.length === 0) return null;
    return tabs[this.activeIndex()] || tabs[0];
  });

  onKeyDown(event: KeyboardEvent) {
    const tabs = this.tabs();
    const index = this.activeIndex();
    let nextIndex = -1;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % tabs.length;
        // Skip disabled
        while (tabs[nextIndex].disabled() && nextIndex !== index) {
          nextIndex = (nextIndex + 1) % tabs.length;
        }
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        // Skip disabled
        while (tabs[nextIndex].disabled() && nextIndex !== index) {
          nextIndex = (nextIndex - 1 + tabs.length) % tabs.length;
        }
        break;
      case 'Home':
        nextIndex = 0;
        if (tabs[nextIndex].disabled()) {
          // Find first enabled
          nextIndex = tabs.findIndex(t => !t.disabled());
        }
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        if (tabs[nextIndex].disabled()) {
          // Find last enabled
          for (let i = tabs.length - 1; i >= 0; i--) {
            if (!tabs[i].disabled()) {
              nextIndex = i;
              break;
            }
          }
        }
        break;
      default:
        return;
    }

    if (nextIndex !== -1 && nextIndex !== index) {
      event.preventDefault();
      this.selectTab(nextIndex);
      // Focus the new button
      setTimeout(() => {
        const buttons = this.tabButtons();
        if (buttons[nextIndex]) {
          buttons[nextIndex].nativeElement.focus();
        }
      });
    }
  }

  selectTab(index: number) {
    const targetTab = this.tabs()[index];
    if (targetTab && !targetTab.disabled()) {
      this.activeIndex.set(index);
    }
  }
}
