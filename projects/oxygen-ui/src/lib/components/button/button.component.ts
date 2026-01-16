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
    '[class]': 'hostClasses()',
    'role': 'button',
    '[attr.tabindex]': 'disabled() ? "-1" : "0"',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-describedby]': 'ariaDescribedBy() || null',
    '[attr.aria-expanded]': 'ariaExpanded() !== undefined ? ariaExpanded() : null',
    '[attr.aria-pressed]': 'ariaPressed() !== undefined ? ariaPressed() : null',
    '[attr.aria-controls]': 'ariaControls() || null',
    '[attr.type]': 'type()',
    '[style.border-radius]': 'borderRadius()',
    '(keydown.enter)': 'onKeydown($event)',
    '(keydown.space)': 'onKeydown($event)',
  }
})
export class ButtonComponent {
  label = input<string>();
  variant = input<InputVariant>('primary');
  size = input<'sm' | 'md' | 'lg'>('sm');
  boxShadow = input<'sm' | 'md' | 'none'>('none');
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

  onKeydown(event: KeyboardEvent) {
    if (this.disabled()) return;
    
    const isNavigationKey = event.key === 'Enter' || event.key === ' ';
    if (!isNavigationKey) return;

    // If it's a native button, the browser already handles Enter/Space clicks.
    // We only need this for custom elements <ox-button>.
    const isNativeButton = event.target instanceof HTMLButtonElement;
    
    if (event.key === ' ') {
      event.preventDefault(); // Prevent scrolling
    }
    
    if (!isNativeButton) {
      (event.target as HTMLElement).click();
    }
  }
}
