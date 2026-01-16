import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[oxBreadcrumbItem]',
  standalone: true
})
export class OxBreadcrumbItemDef {
  constructor(public template: TemplateRef<any>) {}
}
