import { Directive, Input, TemplateRef, Component, input, contentChildren, computed, ContentChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
  selector: '[oxTemplate]',
  standalone: true
})
export class OxygenTemplateDirective {
  @Input('oxTemplate') name: string = '';
  constructor(public template: TemplateRef<any>) {}
}

@Component({
  selector: 'ox-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ox-table-container ox-elevation-1">
      <table class="ox-table">
        <thead class="ox-table-thead">
          <ng-container *ngTemplateOutlet="headerTemplate()"></ng-container>
        </thead>
        <tbody class="ox-table-tbody">
          @for (rowData of value(); track (rowData.id || rowData)) {
            <ng-container *ngTemplateOutlet="bodyTemplate(); context: {$implicit: rowData}"></ng-container>
          } @empty {
            <tr>
              <td class="ox-table-empty">
                No data available
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './table.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  value = input<any[]>([]);
  columns = input<any[]>([]);
  
  templates = contentChildren(OxygenTemplateDirective);

  headerTemplate = computed(() => {
    return this.templates().find(t => t.name === 'header')?.template || null;
  });

  bodyTemplate = computed(() => {
    return this.templates().find(t => t.name === 'body')?.template || null;
  });
}
