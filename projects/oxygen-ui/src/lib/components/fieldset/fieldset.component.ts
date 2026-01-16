import { Component, input, computed, signal, TemplateRef } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

export type FieldsetVariant = 'outlined' | 'flat' | 'seamless';

@Component({
  selector: 'ox-fieldset',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './fieldset.component.html',
  styleUrl: './fieldset.component.scss',
  host: {
    '[class.ox-fieldset]': 'true',
    '[class.ox-fieldset--outlined]': 'variant() === "outlined"',
    '[class.ox-fieldset--flat]': 'variant() === "flat"',
    '[class.ox-fieldset--seamless]': 'variant() === "seamless"',
    '[class.ox-fieldset--disabled]': 'disabled()',
    '[attr.aria-disabled]': 'disabled()',
    '[class.ox-fieldset--legend-start]': 'legendPosition() === "start"',
    '[class.ox-fieldset--legend-center]': 'legendPosition() === "center"',
    '[class.ox-fieldset--legend-end]': 'legendPosition() === "end"',
    '[style.--ox-fieldset-border-style]': 'borderStyle()'
  }
})
export class FieldsetComponent {
  legend = input<string>();
  legendTemplate = input<TemplateRef<any>>();
  variant = input<FieldsetVariant>('outlined');
  disabled = input<boolean>(false);
  legendPosition = input<'start' | 'center' | 'end'>('start');
  borderStyle = input<'solid' | 'dashed' | 'dotted' | 'double'>('solid');
  toggleable = input<boolean>(false);
  iconTemplate = input<TemplateRef<any>>(); // Custom toggle icon
  
  collapsed = signal<boolean>(false);

  toggle() {
    if (this.toggleable()) {
      this.collapsed.update((c: boolean) => !c);
    }
  }
}
