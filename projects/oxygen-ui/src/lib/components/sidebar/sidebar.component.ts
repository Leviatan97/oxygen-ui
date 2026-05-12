import { Component, input, model, output, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ox-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible()) {
      <div class="ox-sidebar-mask" (click)="close()">
        <div 
          class="ox-sidebar ox-sidebar-{{position()}} ox-elevation-4" 
          (click)="$event.stopPropagation()"
          [@sidebarAnim]="position()">
          
          <div class="ox-sidebar-header">
            <span class="ox-sidebar-title">{{ header() }}</span>
            <button class="ox-sidebar-close" (click)="close()">
              <span>×</span>
            </button>
          </div>
          
          <div class="ox-sidebar-content">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './sidebar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('sidebarAnim', [
      transition(':enter', [
        style({ transform: '{{transform}}', opacity: 0 }),
        animate('0.3s cubic-bezier(0, 0, 0.2, 1)', style({ transform: 'none', opacity: 1 }))
      ], { params: { transform: 'translateX(-100%)' } }), // Default to left
      transition(':leave', [
        animate('0.2s ease-in', style({ transform: '{{transform}}', opacity: 0 }))
      ], { params: { transform: 'translateX(-100%)' } })
    ])
  ]
})
export class SidebarComponent {
  visible = model<boolean>(false);
  position = input<'left' | 'right' | 'top' | 'bottom'>('left');
  header = input<string>('');

  onHide = output<void>();

  close() {
    this.visible.set(false);
    this.onHide.emit();
  }
}
