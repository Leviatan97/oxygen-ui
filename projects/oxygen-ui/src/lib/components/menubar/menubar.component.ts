import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface MenuItem {
  label?: string;
  icon?: string;
  routerLink?: string;
  items?: MenuItem[];
  separator?: boolean;
}

@Component({
  selector: 'ox-menubar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="ox-menubar ox-elevation-1">
      <div class="ox-menubar-start">
        <ng-content select="[start]"></ng-content>
      </div>
      
      <ul class="ox-menubar-root-list">
        @for (item of model(); track item.label) {
          @if (item.separator) {
            <li class="ox-menubar-separator"></li>
          } @else {
            <li class="ox-menubar-item" [class.ox-menubar-item-has-children]="item.items">
              <a 
                [routerLink]="item.routerLink" 
                class="ox-menubar-item-link">
                @if (item.icon) {
                  <span class="ox-menubar-item-icon {{item.icon}}"></span>
                }
                <span class="ox-menubar-item-label">{{ item.label }}</span>
                @if (item.items) {
                  <span class="ox-menubar-submenu-icon">▾</span>
                }
              </a>
              
              @if (item.items) {
                <ul class="ox-menubar-submenu">
                  @for (subitem of item.items; track subitem.label) {
                    <li class="ox-menubar-item">
                      <a [routerLink]="subitem.routerLink" class="ox-menubar-item-link">
                        <span class="ox-menubar-item-label">{{ subitem.label }}</span>
                      </a>
                    </li>
                  }
                </ul>
              }
            </li>
          }
        }
      </ul>

      <div class="ox-menubar-end">
        <ng-content select="[end]"></ng-content>
      </div>
    </nav>
  `,
  styleUrl: './menubar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenubarComponent {
  model = input<MenuItem[]>([]);
}
