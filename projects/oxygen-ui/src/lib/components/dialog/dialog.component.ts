import { Component, EventEmitter, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ox-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible()) {
      <div class="ox-dialog-mask" (click)="onMaskClick($event)">
        <div 
          class="ox-dialog ox-elevation-4" 
          [style.width]="width"
          [@dialogAnim]
          (click)="$event.stopPropagation()">
          
          <div class="ox-dialog-header">
            <span class="ox-dialog-title">{{ header }}</span>
            <button class="ox-dialog-close" (click)="close()">
              <span>×</span>
            </button>
          </div>
          
          <div class="ox-dialog-content">
            <ng-content></ng-content>
          </div>
          
          @if (hasFooter) {
            <div class="ox-dialog-footer">
              <ng-content select="ox-footer"></ng-content>
            </div>
          }
        </div>
      </div>
    }
  `,
  styleUrl: './dialog.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('dialogAnim', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('0.2s cubic-bezier(0, 0, 0.2, 1)', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.1s ease-in', style({ transform: 'scale(0.95)', opacity: 0 }))
      ])
    ])
  ]
})
export class DialogComponent {
  visible = model<boolean>(false);
  @Input() header: string = '';
  @Input() width: string = '50vw';
  @Input() dismissableMask: boolean = true;
  @Input() hasFooter: boolean = false;

  @Output() onHide = new EventEmitter<void>();

  close() {
    this.visible.set(false);
    this.onHide.emit();
  }

  onMaskClick(event: MouseEvent) {
    if (this.dismissableMask) {
      this.close();
    }
  }
}
