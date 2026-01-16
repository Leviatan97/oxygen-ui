import { Component, input, TemplateRef, viewChild, Directive, inject, contentChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
  selector: 'ng-template[oxTabHeader]',
  standalone: true
})
export class OxTabHeaderDirective {
  templateRef = inject(TemplateRef);
}

let nextId = 0;

@Component({
  selector: 'ox-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-template #tabContent>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: []
})
export class TabComponent {
  id = input<string>(`ox-tab-${nextId++}`);
  label = input<string>(''); // Make optional if template is used
  disabled = input<boolean>(false);

  content = viewChild.required<TemplateRef<any>>('tabContent');
  headerTemplate = contentChild(OxTabHeaderDirective);
}
