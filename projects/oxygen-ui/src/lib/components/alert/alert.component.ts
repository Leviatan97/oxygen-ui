import { Component, input, output, signal } from '@angular/core';
import { OxygenSeverity } from '../../lib-core';
import { CommonModule } from '@angular/common';

export type AlertVariant = 'filled' | 'outlined' | 'flat' | 'glass';

@Component({
  selector: 'ox-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  host: {
    '[class.ox-alert]': 'true',
    '[class.ox-alert--success]': 'severity() === "success"',
    '[class.ox-alert--info]': 'severity() === "info"',
    '[class.ox-alert--warning]': 'severity() === "warn"',
    '[class.ox-alert--danger]': 'severity() === "error"',
    '[class.ox-alert--filled]': 'variant() === "filled"',
    '[class.ox-alert--outlined]': 'variant() === "outlined"',
    '[class.ox-alert--flat]': 'variant() === "flat"',
    '[class.ox-alert--glass]': 'variant() === "glass"',
    '[class.ox-alert--hidden]': '!isVisible()',
    '[attr.role]': 'severity() === "error" ? "alert" : "status"',
    '[attr.aria-live]': 'severity() === "error" ? "assertive" : "polite"'
  }
})
export class AlertComponent {
  severity = input<OxygenSeverity>('info');
  variant = input<AlertVariant>('flat');
  title = input<string>();
  closable = input<boolean>(false);
  
  onClose = output<void>();
  
  isVisible = signal<boolean>(true);

  close() {
    this.isVisible.set(false);
    this.onClose.emit();
  }
}
