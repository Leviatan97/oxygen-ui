import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  SampleComponent, 
  ButtonComponent, 
  AccordionComponent, 
  AccordionItemComponent, 
  OxAccordionHeaderDirective, 
  CardComponent, 
  OxCardHeaderDirective, 
  OxCardBodyDirective, 
  OxCardFooterDirective, 
  OxCardBackDirective, 
  OxCardBackHeaderDirective, 
  OxCardBackBodyDirective, 
  OxCardBackFooterDirective, 
  DividerComponent, 
  FieldsetComponent 
} from 'oxygen-ui';

import { PanelComponent } from 'oxygen-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    SampleComponent,
    ButtonComponent, 
    CardComponent, 
    AccordionComponent, 
    AccordionItemComponent,
    OxAccordionHeaderDirective,
    OxCardHeaderDirective,
    OxCardBodyDirective,
    OxCardFooterDirective,
    OxCardBackDirective,
    OxCardBackHeaderDirective,
    OxCardBackBodyDirective,
    OxCardBackFooterDirective,
    DividerComponent,
    FieldsetComponent,
    PanelComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo';
  controlledActiveId = signal<string | null>(null);
  cardFlipped = signal<boolean>(false);
  flip2 = signal<boolean>(false);

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
