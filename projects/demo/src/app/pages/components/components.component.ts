import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarComponent } from 'oxygen-ui';

@Component({
  selector: 'app-components-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, SidebarComponent],
  template: `
    <div class="components-layout">
      <aside class="sidebar">
        <nav class="nav">
          <div class="nav-section">General</div>
          <a routerLink="button" routerLinkActive="active" class="nav-item">Button</a>
          <a routerLink="badge" routerLinkActive="active" class="nav-item">Badge</a>
          <a routerLink="divider" routerLinkActive="active" class="nav-item">Divider</a>
          
          <div class="nav-section">Layout</div>
          <a routerLink="card" routerLinkActive="active" class="nav-item">Card</a>
          <a routerLink="panel" routerLinkActive="active" class="nav-item">Panel</a>
          <a routerLink="fieldset" routerLinkActive="active" class="nav-item">Fieldset</a>
          <a routerLink="accordion" routerLinkActive="active" class="nav-item">Accordion</a>
          <a routerLink="tabs" routerLinkActive="active" class="nav-item">Tabs</a>
          <a routerLink="toolbar" routerLinkActive="active" class="nav-item">Toolbar</a>
          
          <div class="nav-section">Forms</div>
          <a routerLink="input" routerLinkActive="active" class="nav-item">Input</a>
          <a routerLink="password" routerLinkActive="active" class="nav-item">Password</a>
          <a routerLink="textarea" routerLinkActive="active" class="nav-item">Textarea</a>
          <a routerLink="date" routerLinkActive="active" class="nav-item">Date Input</a>
          <a routerLink="datepicker" routerLinkActive="active" class="nav-item">DatePicker</a>
          <a routerLink="file" routerLinkActive="active" class="nav-item">File Upload</a>
          <a routerLink="otp" routerLinkActive="active" class="nav-item">OTP</a>
          <a routerLink="radio" routerLinkActive="active" class="nav-item">Radio</a>
          <a routerLink="rating" routerLinkActive="active" class="nav-item">Rating</a>
          <a routerLink="slider" routerLinkActive="active" class="nav-item">Slider</a>
          <a routerLink="knob" routerLinkActive="active" class="nav-item">Knob</a>
          <a routerLink="dropdown" routerLinkActive="active" class="nav-item">Dropdown</a>
          <a routerLink="checkbox" routerLinkActive="active" class="nav-item">Checkbox</a>
          <a routerLink="switch" routerLinkActive="active" class="nav-item">Switch</a>
          
          <div class="nav-section">Data</div>
          <a routerLink="table" routerLinkActive="active" class="nav-item">Table</a>
          <a routerLink="paginator" routerLinkActive="active" class="nav-item">Paginator</a>
          
          <div class="nav-section">Feedback</div>
          <a routerLink="alert" routerLinkActive="active" class="nav-item">Alert</a>
          <a routerLink="toast" routerLinkActive="active" class="nav-item">Toast</a>
          <a routerLink="dialog" routerLinkActive="active" class="nav-item">Dialog</a>
          <a routerLink="tooltip" routerLinkActive="active" class="nav-item">Tooltip</a>
          
          <div class="nav-section">Navigation</div>
          <a routerLink="menubar" routerLinkActive="active" class="nav-item">Menubar</a>
          <a routerLink="breadcrumb" routerLinkActive="active" class="nav-item">Breadcrumb</a>
          <a routerLink="stepper" routerLinkActive="active" class="nav-item">Stepper</a>
        </nav>
      </aside>
      
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .components-layout {
      display: flex;
      gap: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }
    .sidebar {
      width: 240px;
      flex-shrink: 0;
      position: sticky;
      top: 100px;
      height: calc(100vh - 140px);
      overflow-y: auto;
      padding-right: 1rem;
      border-right: 1px solid #f1f5f9;
    }
    .nav {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .nav-section {
      font-size: 0.75rem;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
      letter-spacing: 0.05em;
    }
    .nav-item {
      padding: 0.5rem 0.75rem;
      border-radius: var(--radius-sm);
      color: #475569;
      text-decoration: none;
      font-size: 0.9375rem;
      transition: all 0.2s;
      
      &:hover {
        background-color: #f8fafc;
        color: var(--oxy-primary);
      }
      &.active {
        background-color: color-mix(in srgb, var(--oxy-primary), transparent 90%);
        color: var(--oxy-primary);
        font-weight: 600;
      }
    }
    .content {
      flex: 1;
      min-width: 0;
    }
  `]
})
export class ComponentsPageComponent {}