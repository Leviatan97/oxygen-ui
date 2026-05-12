import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent, TabComponent } from 'oxygen-ui';

@Component({
  selector: 'app-tabs-demo',
  standalone: true,
  imports: [CommonModule, TabsComponent, TabComponent],
  template: `
    <div class="demo-page">
      <h1>Tabs</h1>
      <p class="description">Organiza el contenido en paneles con pestañas para facilitar la navegación.</p>

      <section class="demo-section">
        <h2>Básico</h2>
        <ox-tabs>
          <ox-tab label="Perfil" icon="pi pi-user">
            <div class="p-4">
              <h3>Información de Perfil</h3>
              <p>Contenido relacionado con el perfil del usuario.</p>
            </div>
          </ox-tab>
          <ox-tab label="Seguridad" icon="pi pi-lock">
            <div class="p-4">
              <h3>Ajustes de Seguridad</h3>
              <p>Cambio de contraseña y autenticación de dos factores.</p>
            </div>
          </ox-tab>
        </ox-tabs>
      </section>

      <section class="demo-section">
        <h2>Variantes de Color</h2>
        <p>Las pestañas pueden usar diferentes severidades de color para enfatizar su importancia.</p>
        
        <div class="flex flex-column gap-6">
          <div>
            <h3 class="mb-2">Success</h3>
            <ox-tabs color="success">
              <ox-tab label="Ventas" icon="pi pi-chart-line">Contenido de ventas...</ox-tab>
              <ox-tab label="Ingresos" icon="pi pi-money-bill">Contenido de ingresos...</ox-tab>
            </ox-tabs>
          </div>

          <div>
            <h3 class="mb-2">Danger</h3>
            <ox-tabs color="danger">
              <ox-tab label="Errores" icon="pi pi-exclamation-circle">Lista de errores...</ox-tab>
              <ox-tab label="Logs" icon="pi pi-history">Historial de sistema...</ox-tab>
            </ox-tabs>
          </div>

          <div>
            <h3 class="mb-2">Warning</h3>
            <ox-tabs color="warning">
              <ox-tab label="Alertas" icon="pi pi-bell">Alertas pendientes...</ox-tab>
              <ox-tab label="Tareas" icon="pi pi-list">Tareas atrasadas...</ox-tab>
            </ox-tabs>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 800px; padding: 2rem; }
    h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .description { font-size: 1.125rem; color: #64748b; margin-bottom: 3rem; }
    .demo-section { margin-bottom: 4rem; }
    .p-4 { padding: 1rem; }
    .flex { display: flex; }
    .flex-column { flex-direction: column; }
    .gap-6 { gap: 2rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    h3 { font-size: 1rem; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
  `]
})
export class TabsDemoComponent {}