import { Component, input, computed, ViewEncapsulation, contentChild, TemplateRef } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { OxBreadcrumbItemDef } from './breadcrumb-item-def.directive';

export interface BreadcrumbItem {
  label: string;
  url?: string;
  icon?: string;
  disabled?: boolean;
  target?: string;
  command?: (event: MouseEvent) => void;
}

@Component({
  selector: 'ox-breadcrumb',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    'role': 'navigation',
    'aria-label': 'Breadcrumb',
    '[class]': 'hostClasses()'
  }
})
export class BreadcrumbComponent {
  items = input.required<BreadcrumbItem[]>();
  separator = input<string>('/');
  homeIcon = input<string>();
  severity = input<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'>();

  itemTemplate = contentChild(OxBreadcrumbItemDef);

  hostClasses = computed(() => {
    const severity = this.severity();
    return [
      'ox-breadcrumb-container',
      severity ? `ox-breadcrumb--${severity}` : ''
    ].filter(Boolean).join(' ');
  });

  onItemClick(event: MouseEvent, item: BreadcrumbItem) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (item.command) {
      item.command(event);
    }
  }
}
