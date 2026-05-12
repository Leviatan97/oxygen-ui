import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent, ButtonComponent } from 'oxygen-ui';

@Component({
  selector: 'app-sidebar-demo',
  standalone: true,
  imports: [CommonModule, SidebarComponent, ButtonComponent],
  template: `
    <div class="demo-page">
      <h1>Sidebar</h1>
      <p class="description">Un panel superpuesto que aparece desde los bordes de la pantalla.</p>

      <section class="demo-section">
        <h2>Posiciones</h2>
        <div class="flex gap-2">
          <ox-button label="Izquierda" (onClick)="left = true"></ox-button>
          <ox-button label="Derecha" severity="secondary" (onClick)="right = true"></ox-button>
          <ox-button label="Arriba" severity="info" (onClick)="top = true"></ox-button>
          <ox-button label="Abajo" severity="warn" (onClick)="bottom = true"></ox-button>
        </div>

        <ox-sidebar [(visible)]="left" position="left" header="Menú Principal">
          <ul class="sidebar-list">
            <li>Inicio</li>
            <li>Productos</li>
            <li>Contacto</li>
          </ul>
        </ox-sidebar>

        <ox-sidebar [(visible)]="right" position="right" header="Notificaciones">
          <p>No tienes notificaciones pendientes.</p>
        </ox-sidebar>

        <ox-sidebar [(visible)]="top" position="top" header="Banner Superior">
          <p class="p-4">Contenido que aparece desde arriba.</p>
        </ox-sidebar>

        <ox-sidebar [(visible)]="bottom" position="bottom" header="Panel Inferior">
          <p class="p-4">Contenido que aparece desde abajo.</p>
        </ox-sidebar>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 800px; padding: 2rem; }
    h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .description { font-size: 1.125rem; color: #64748b; margin-bottom: 3rem; }
    .demo-section { margin-bottom: 4rem; }
    .flex { display: flex; }
    .gap-2 { gap: 0.5rem; }
    .p-4 { padding: 1rem; }
    .sidebar-list { list-style: none; padding: 0; }
    .sidebar-list li { padding: 1rem; border-bottom: 1px solid #f1f5f9; cursor: pointer; }
    .sidebar-list li:hover { background: #f8fafc; }
  `]
})
export class SidebarDemoComponent {
  left = false;
  right = false;
  top = false;
  bottom = false;
}