import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from 'oxygen-ui';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ButtonComponent],
  template: `
    <header class="main-header">
      <div class="header-container">
        <div class="logo-container" routerLink="/">
          <div class="logo-icon">O₂</div>
          <span class="logo-text">Oxygen UI</span>
        </div>
        
        <nav class="main-nav">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/components" routerLinkActive="active">Components</a>
          <a href="https://github.com" target="_blank">Docs</a>
        </nav>

        <div class="header-actions">
          <ox-button variant="outline-primary" size="sm" (click)="toggleTheme()">
             Theme
          </ox-button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .main-header {
      height: 64px;
      border-bottom: 1px solid #f1f5f9;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(8px);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .header-container {
      max-width: 1400px;
      height: 100%;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo-container {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
    }
    .logo-icon {
      width: 32px;
      height: 32px;
      background: var(--oxy-primary);
      color: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 0.75rem;
    }
    .logo-text {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1e293b;
    }
    .main-nav {
      display: flex;
      gap: 2rem;
    }
    .main-nav a {
      text-decoration: none;
      color: #64748b;
      font-weight: 500;
      font-size: 0.9375rem;
      transition: color 0.3s;
      
      &:hover {
        color: var(--oxy-primary);
      }
      &.active {
        color: var(--oxy-primary);
        font-weight: 600;
      }
    }
  `]
})
export class HeaderComponent {
  toggleTheme() {
    document.body.classList.toggle('dark');
  }
}