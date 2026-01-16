import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertType = 'success' | 'info' | 'warning' | 'danger';
export type AlertVariant = 'filled' | 'outlined' | 'flat' | 'glass';

@Component({
  selector: 'ox-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  host: {
    '[class.ox-alert]': 'true',
    '[class.ox-alert--success]': 'type() === "success"',
    '[class.ox-alert--info]': 'type() === "info"',
    '[class.ox-alert--warning]': 'type() === "warning"',
    '[class.ox-alert--danger]': 'type() === "danger"',
    '[class.ox-alert--filled]': 'variant() === "filled"',
    '[class.ox-alert--outlined]': 'variant() === "outlined"',
    '[class.ox-alert--flat]': 'variant() === "flat"',
    '[class.ox-alert--glass]': 'variant() === "glass"',
    '[class.ox-alert--hidden]': '!isVisible()',
    '[attr.role]': 'type() === "danger" ? "alert" : "status"',
    '[attr.aria-live]': 'type() === "danger" ? "assertive" : "polite"'
  }
})
export class AlertComponent {
  type = input<AlertType>('info');
  variant = input<AlertVariant>('flat');
  title = input<string>();
  closable = input<boolean>(false);
  
  onClose = output<void>();
  
  isVisible = signal<boolean>(true);

  close() {
    this.isVisible.set(false);
    // Emit after animation would be better, but for now immediate:
    this.onClose.emit();
  }
}
