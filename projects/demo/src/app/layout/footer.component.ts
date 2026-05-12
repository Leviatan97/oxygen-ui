import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="main-footer">
      <div class="footer-container">
        <div class="footer-left">
          <p>© 2026 Oxygen UI Team. Built with Angular 21.</p>
        </div>
        <div class="footer-right">
          <a href="#">Twitter</a>
          <a href="#">Discord</a>
          <a href="#">GitHub</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .main-footer {
      padding: 4rem 2rem;
      border-top: 1px solid #f1f5f9;
      background-color: #f8fafc;
      margin-top: 4rem;
    }
    .footer-container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      color: #94a3b8;
      font-size: 0.875rem;
    }
    .footer-right {
      display: flex;
      gap: 2rem;
    }
    .footer-right a {
      color: #64748b;
      text-decoration: none;
      transition: color 0.3s;
      
      &:hover {
        color: var(--oxy-primary);
      }
    }
  `]
})
export class FooterComponent {}