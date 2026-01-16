import { Component, input, TemplateRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ox-step',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-template #stepContent>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: []
})
export class StepComponent {
  label = input.required<string>();
  optional = input<boolean>(false);
  editable = input<boolean>(true);
  completed = input<boolean>(false);

  content = viewChild.required<TemplateRef<any>>('stepContent');
}
