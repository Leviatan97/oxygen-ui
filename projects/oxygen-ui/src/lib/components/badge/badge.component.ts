import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeSeverity = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeVariant = 'filled' | 'outlined' | 'flat';
export type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ox-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  host: {
    '[class]': 'hostClasses()',
    '[class.ox-badge--pill]': 'pill()',
    '[class.ox-badge--dot]': 'dot()',
    '[attr.role]': 'dot() ? null : "status"',
    '[attr.aria-label]': 'ariaLabel() || (dot() ? null : value()?.toString())',
    '[attr.aria-hidden]': 'dot() && !ariaLabel() ? "true" : null'
  }
})
export class BadgeComponent {
  value = input<string | number>();
  severity = input<BadgeSeverity>('primary');
  variant = input<BadgeVariant>('filled');
  size = input<BadgeSize>('md');
  pill = input<boolean>(false);
  dot = input<boolean>(false);
  overlay = input<boolean>(false);
  ariaLabel = input<string | null>(null, { alias: 'aria-label' });

  hostClasses = computed(() => {
    return [
      'ox-badge',
      `ox-badge--${this.severity()}`,
      `ox-badge--${this.variant()}`,
      `ox-badge--${this.size()}`,
      this.overlay() ? 'ox-badge--overlay' : ''
    ].filter(c => !!c).join(' ');
  });
}
