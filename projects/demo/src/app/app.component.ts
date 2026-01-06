import { Component, signal } from '@angular/core';

import { SampleComponent, ButtonComponent, AccordionComponent, AccordionItemComponent, OxAccordionHeaderDirective } from 'oxygen-ui';

@Component({
  selector: 'app-root',
  imports: [SampleComponent, ButtonComponent, AccordionComponent, AccordionItemComponent, OxAccordionHeaderDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo';
  controlledActiveId = signal<string | null>(null);

  private accordionIds = ['item1', 'item2'];

  nextItem() {
    const current = this.controlledActiveId();
    const index = current ? this.accordionIds.indexOf(current) : -1;
    const nextIndex = (index + 1) % this.accordionIds.length;
    this.controlledActiveId.set(this.accordionIds[nextIndex]);
  }

  prevItem() {
    const current = this.controlledActiveId();
    const index = current ? this.accordionIds.indexOf(current) : -1;
    const prevIndex = index <= 0 ? this.accordionIds.length - 1 : index - 1;
    this.controlledActiveId.set(this.accordionIds[prevIndex]);
  }
}
