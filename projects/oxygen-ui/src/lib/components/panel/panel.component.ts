import { Component, input, signal, TemplateRef, computed } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

export type PanelVariant = 'outlined' | 'flat' | 'seamless';
export type PanelHeaderPosition = 'start' | 'center' | 'end';

@Component({
  selector: 'ox-panel',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  host: {
    '[class.ox-panel]': 'true',
    '[class.ox-panel--outlined]': 'variant() === "outlined"',
    '[class.ox-panel--flat]': 'variant() === "flat"',
    '[class.ox-panel--seamless]': 'variant() === "seamless"',
    '[class.ox-panel--disabled]': 'disabled()',
    '[attr.aria-disabled]': 'disabled()',
    '[class.ox-panel--header-start]': 'headerPosition() === "start"',
    '[class.ox-panel--header-center]': 'headerPosition() === "center"',
    '[class.ox-panel--header-end]': 'headerPosition() === "end"',
    '[style.--ox-panel-border-style]': 'borderStyle()',
    '[style.--ox-panel-box-shadow]': 'shadowValue()'
  }
})
export class PanelComponent {
  header = input<string>();
  headerTemplate = input<TemplateRef<any>>(); // Custom header content
  variant = input<PanelVariant>('outlined');
  disabled = input<boolean>(false);
  headerPosition = input<PanelHeaderPosition>('start');
  toggleable = input<boolean>(false);
  iconTemplate = input<TemplateRef<any>>(); // Custom toggle icon
  borderStyle = input<'solid' | 'dashed' | 'dotted' | 'double'>('solid');
  boxShadow = input<'sm' | 'md' | 'lg' | 'none'>('none');
  scrollable = input<boolean>(false);
  scrollDirection = input<'x' | 'y' | 'both'>('y');
  scrollHeight = input<string>('300px');
  scrollWidth = input<string>('100%');
  
  collapsed = signal<boolean>(false);

  protected shadowValue = computed(() => {
    if (this.boxShadow() === 'none') return 'none';
    return `var(--shadow-${this.boxShadow()})`;
  });

  private static nextId = 0;
  private readonly uniqueId = `ox-panel-${PanelComponent.nextId++}`;

  protected headerId = computed(() => `${this.uniqueId}-header`);
  protected contentId = computed(() => `${this.uniqueId}-content`);

  toggle() {
    if (this.toggleable() && !this.disabled()) {
      this.collapsed.update((c: boolean) => !c);
    }
  }
}
