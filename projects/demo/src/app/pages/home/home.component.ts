import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from 'oxygen-ui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent],
  template: `
    <div class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Oxygen UI</h1>
        <p class="hero-subtitle">Modern Design System for Angular 21+</p>
        <p class="hero-description">
          A high-performance, lightweight, and professional UI library built from the ground up 
          using <strong>Signals</strong> and <strong>Angular CDK</strong>.
        </p>
        <div class="hero-actions">
          <ox-button routerLink="/components" size="lg">Get Started</ox-button>
          <ox-button variant="outline-primary" size="lg" (click)="goToGithub()">GitHub</ox-button>
        </div>
      </div>
      
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon">🚀</div>
          <h3>Modern APIs</h3>
          <p>Built exclusively with Angular Signals and the latest template syntax.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🎨</div>
          <h3>Design System</h3>
          <p>Strictly typed and powered by CSS variables for easy theming.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🧩</div>
          <h3>Professional Components</h3>
          <p>From simple Buttons to complex Tables and Dialogs with overlays.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 4rem 2rem;
      text-align: center;
      min-height: calc(100vh - 200px);
    }
    .hero-content {
      max-width: 800px;
      margin-bottom: 4rem;
    }
    .hero-title {
      font-size: 4rem;
      font-weight: 800;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, var(--oxy-primary) 0%, #a855f7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-subtitle {
      font-size: 1.5rem;
      color: var(--oxy-primary);
      margin-bottom: 1.5rem;
      font-weight: 600;
    }
    .hero-description {
      font-size: 1.25rem;
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      width: 100%;
      max-width: 1100px;
    }
    .feature-card {
      padding: 2rem;
      background: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      border: 1px solid #f1f5f9;
      transition: transform 0.2s;
      
      &:hover {
        transform: translateY(-5px);
      }
    }
    .feature-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    .feature-card h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }
    .feature-card p {
      color: #64748b;
      line-height: 1.5;
    }
  `]
})
export class HomeComponent {
  goToGithub() {
    window.open('https://github.com', '_blank');
  }
}