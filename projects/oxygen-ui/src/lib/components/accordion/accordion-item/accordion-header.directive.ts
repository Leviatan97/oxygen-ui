import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[oxAccordionHeader]',
  standalone: true
})
export class OxAccordionHeaderDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
