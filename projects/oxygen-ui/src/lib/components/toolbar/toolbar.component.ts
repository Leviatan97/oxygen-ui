import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ox-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  host: {
    '[class.ox-toolbar]': 'true',
    '[class.ox-toolbar--primary]': 'color() === "primary"',
    '[class.ox-toolbar--surface]': 'color() === "surface"',
    '[class.ox-toolbar--secondary]': 'color() === "secondary"',
    '[class.ox-toolbar--transparent]': 'color() === "transparent"',
    '[class.ox-toolbar--sticky]': 'sticky()',
    '[class.ox-toolbar--shadow]': 'shadow()'
  }
})
export class ToolbarComponent {
  color = input<'primary' | 'surface' | 'secondary' | 'transparent'>('surface');
  sticky = input<boolean>(false);
  shadow = input<boolean>(true);
}
