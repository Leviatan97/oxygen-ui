import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent, AccordionItemComponent, OxAccordionHeaderDirective } from 'oxygen-ui';

@Component({
  selector: 'app-accordion-demo',
  standalone: true,
  imports: [CommonModule, AccordionComponent, AccordionItemComponent, OxAccordionHeaderDirective],
  template: `
    <div class="demo-page">
      <h1>Accordion</h1>
      <p class="description">Un contenedor para mostrar contenido en paneles expandibles y colapsables.</p>

      <section class="demo-section">
        <h2>Básico</h2>
        <ox-accordion>
          <ox-accordion-item id="item1">
            <ng-template oxAccordionHeader>Sección 1: Información</ng-template>
            <p>Contenido detallado de la primera sección.</p>
          </ox-accordion-item>
          <ox-accordion-item id="item2">
            <ng-template oxAccordionHeader>Sección 2: Ajustes</ng-template>
            <p>Configuraciones y opciones del sistema.</p>
          </ox-accordion-item>
        </ox-accordion>
      </section>

      <section class="demo-section">
        <h2>Múltiple Selección</h2>
        <ox-accordion [multi]="true">
          <ox-accordion-item id="m1">
            <ng-template oxAccordionHeader>Panel A</ng-template>
            <p>Puedes abrir varios paneles a la vez.</p>
          </ox-accordion-item>
          <ox-accordion-item id="m2">
            <ng-template oxAccordionHeader>Panel B</ng-template>
            <p>Útil para dashboards o guías largas.</p>
          </ox-accordion-item>
        </ox-accordion>
      </section>

      <section class="demo-section">
        <h2>Colores y Variantes</h2>
        <div class="flex flex-column gap-4">
          <h3>Sólidos</h3>
          <ox-accordion>
            <ox-accordion-item color="primary">
              <ng-template oxAccordionHeader>Primary Accordion</ng-template>
              <p>Contenido con estilo de color primario.</p>
            </ox-accordion-item>
            <ox-accordion-item color="success">
              <ng-template oxAccordionHeader>Success Accordion</ng-template>
              <p>Contenido con estilo de color de éxito.</p>
            </ox-accordion-item>
            <ox-accordion-item color="danger">
              <ng-template oxAccordionHeader>Danger Accordion</ng-template>
              <p>Contenido con estilo de color de peligro.</p>
            </ox-accordion-item>
          </ox-accordion>

          <h3 class="mt-4">Outlined</h3>
          <ox-accordion>
            <ox-accordion-item color="outline-primary">
              <ng-template oxAccordionHeader>Outline Primary</ng-template>
              <p>Borde inferior resaltado con el color primario.</p>
            </ox-accordion-item>
            <ox-accordion-item color="outline-info">
              <ng-template oxAccordionHeader>Outline Info</ng-template>
              <p>Borde inferior resaltado con el color de información.</p>
            </ox-accordion-item>
          </ox-accordion>

          <h3 class="mt-4">Ghost</h3>
          <ox-accordion>
            <ox-accordion-item color="ghost-primary">
              <ng-template oxAccordionHeader>Ghost Primary</ng-template>
              <p>Estilo minimalista con resaltado en hover.</p>
            </ox-accordion-item>
            <ox-accordion-item color="ghost-warning">
              <ng-template oxAccordionHeader>Ghost Warning</ng-template>
              <p>Estilo minimalista con color de advertencia.</p>
            </ox-accordion-item>
          </ox-accordion>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 800px; padding: 2rem; }
    h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .description { font-size: 1.125rem; color: #64748b; margin-bottom: 3rem; }
    .demo-section { margin-bottom: 4rem; }
    .demo-section h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.5rem; }
    .flex { display: flex; }
    .flex-column { flex-direction: column; }
    .gap-4 { gap: 1rem; }
    .mt-4 { margin-top: 1.5rem; }
    h3 { font-size: 1.125rem; font-weight: 600; color: #475569; }
  `]
})
export class AccordionDemoComponent {}