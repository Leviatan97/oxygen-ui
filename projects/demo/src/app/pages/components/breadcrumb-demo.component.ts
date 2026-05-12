import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from 'oxygen-ui';

@Component({
  selector: 'app-breadcrumb-demo',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  template: `
    <div class="demo-page">
      <h1>Breadcrumb</h1>
      <p class="description">Componente de navegación que muestra la jerarquía de la página actual.</p>

      <section class="demo-section">
        <h2>Básico</h2>
        <div class="card p-4">
          <ox-breadcrumb [items]="items"></ox-breadcrumb>
        </div>
      </section>

      <section class="demo-section">
        <h2>Separador Personalizado</h2>
        <div class="card p-4">
          <ox-breadcrumb [items]="items" separator=">"></ox-breadcrumb>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 800px; padding: 2rem; }
    h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .description { font-size: 1.125rem; color: #64748b; margin-bottom: 3rem; }
    .demo-section { margin-bottom: 4rem; }
    .card { background: white; border-radius: 8px; border: 1px solid #e2e8f0; }
    .p-4 { padding: 1rem; }
  `]
})
export class BreadcrumbDemoComponent {
  items = [
    { label: 'Inicio', url: '/' },
    { label: 'Componentes' },
    { label: 'Navegación' },
    { label: 'Breadcrumb', current: true }
  ];
}