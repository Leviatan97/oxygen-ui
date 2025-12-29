import { Component, input, computed, ViewEncapsulation } from '@angular/core';

export type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type ButtonVariantPrefix = 'outline' | 'ghost';
export type InputVariant = ButtonColor | `${ButtonVariantPrefix}-${ButtonColor}`;

export interface TypesButton {
  variant: InputVariant;
}

@Component({
  selector: 'ox-button, button[ox-button], button[oxy-button]',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.oxy-button]': 'true',
    '[class.oxy-button--primary]': 'variant() === "primary"',
    '[class.oxy-button--secondary]': 'variant() === "secondary"',
    '[class.oxy-button--success]': 'variant() === "success"',
    '[class.oxy-button--danger]': 'variant() === "danger"',
    '[class.oxy-button--warning]': 'variant() === "warning"',
    '[class.oxy-button--info]': 'variant() === "info"',
    '[class.oxy-button--outline-primary]': 'variant() === "outline-primary"',
    '[class.oxy-button--outline-secondary]': 'variant() === "outline-secondary"',
    '[class.oxy-button--outline-success]': 'variant() === "outline-success"',
    '[class.oxy-button--outline-danger]': 'variant() === "outline-danger"',
    '[class.oxy-button--outline-warning]': 'variant() === "outline-warning"',
    '[class.oxy-button--outline-info]': 'variant() === "outline-info"',
    '[class.oxy-button--ghost-primary]': 'variant() === "ghost-primary"',
    '[class.oxy-button--ghost-secondary]': 'variant() === "ghost-secondary"',
    '[class.oxy-button--ghost-success]': 'variant() === "ghost-success"',
    '[class.oxy-button--ghost-danger]': 'variant() === "ghost-danger"',
    '[class.oxy-button--ghost-warning]': 'variant() === "ghost-warning"',
    '[class.oxy-button--ghost-info]': 'variant() === "ghost-info"',
    '[class.oxy-button--sm]': 'size() === "sm"',
    '[class.oxy-button--md]': 'size() === "md"',
    '[class.oxy-button--lg]': 'size() === "lg"',
    '[class.oxy-button--shadow-sm]': 'boxShadow() === "sm"',
    '[class.oxy-button--shadow-md]': 'boxShadow() === "md"',
    '[class.oxy-button--shadow-none]': 'boxShadow() === "none"',
    '[class.oxy-button--disabled]': 'disabled()',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-describedby]': 'ariaDescribedBy() || null',
    '[attr.aria-expanded]': 'ariaExpanded() !== undefined ? ariaExpanded() : null',
    '[attr.aria-pressed]': 'ariaPressed() !== undefined ? ariaPressed() : null',
    '[attr.aria-controls]': 'ariaControls() || null',
    '[attr.type]': 'type()',
    '[style.border-radius]': 'borderRadius()',
  }
})
export class ButtonComponent {
  label = input<string>();
  variant = input<InputVariant>('primary');
  size = input<'sm' | 'md' | 'lg'>('sm');
  boxShadow = input<'sm' | 'md' | 'none'>('sm');
  disabled = input<boolean>(false);
  borderRadius = input<string>();

  // Accessibility inputs
  ariaLabel = input<string | null>(null, { alias: 'aria-label' });
  ariaDescribedBy = input<string | null>(null, { alias: 'aria-describedby' });
  ariaExpanded = input<boolean | undefined>(undefined, { alias: 'aria-expanded' });
  ariaPressed = input<boolean | undefined>(undefined, { alias: 'aria-pressed' });
  ariaControls = input<string | null>(null, { alias: 'aria-controls' });
  type = input<'button' | 'submit' | 'reset'>('button');

  hostClasses = computed(() => {
    return [
      'oxy-button',
      `oxy-button--${this.variant()}`,
      `oxy-button--${this.size()}`,
      `oxy-button--shadow-${this.boxShadow()}`,
      this.disabled() ? 'oxy-button--disabled' : ''
    ].filter(Boolean).join(' ');
  });
}
