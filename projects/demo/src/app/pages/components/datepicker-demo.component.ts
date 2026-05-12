import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'oxygen-ui';

@Component({
  selector: 'app-datepicker-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePickerComponent],
  template: `
    <div class="demo-page">
      <h1>DatePicker</h1>
      <p class="description">Un selector de fecha avanzado y personalizado con control total sobre el diseño, formato y comportamiento.</p>

      <section class="demo-section">
        <h2>Básico</h2>
        <div class="demo-grid">
          <ox-date-picker label="Seleccionar Fecha"></ox-date-picker>
          <ox-date-picker label="Con Placeholder" placeholder="DD/MM/YYYY"></ox-date-picker>
        </div>
      </section>

      <section class="demo-section">
        <h2>Float Labels & Variantes</h2>
        <p class="demo-subsection-desc">Soporta las mismas variantes de etiquetas flotantes que el resto de inputs de la librería.</p>
        <div class="demo-grid">
          <ox-date-picker 
            label="Default Float" 
            [floatLabel]="true" 
            variant="default">
          </ox-date-picker>
          
          <ox-date-picker 
            label="Fieldset Float" 
            [floatLabel]="true" 
            variant="fieldset">
          </ox-date-picker>

          <ox-date-picker 
            label="One Line Float" 
            [floatLabel]="true" 
            variant="oneLine">
          </ox-date-picker>
        </div>
      </section>

      <section class="demo-section">
        <h2>Formatos Personalizados</h2>
        <p class="demo-subsection-desc">Puedes definir el formato de visualización usando tokens como DD, MM y YYYY.</p>
        <div class="demo-grid">
          <ox-date-picker 
            label="ISO Format" 
            format="YYYY-MM-DD"
            placeholder="YYYY-MM-DD">
          </ox-date-picker>
          
          <ox-date-picker 
            label="Custom Format" 
            format="DD / MM / YYYY"
            placeholder="DD / MM / YYYY">
          </ox-date-picker>
        </div>
      </section>

      <section class="demo-section">
        <h2>Estados</h2>
        <div class="demo-grid">
          <ox-date-picker label="Deshabilitado" [disabled]="true"></ox-date-picker>
          <ox-date-picker label="Con Error" error="La fecha es obligatoria"></ox-date-picker>
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
    .demo-subsection-desc { color: #64748b; margin-bottom: 1.5rem; font-size: 0.875rem; }
    .demo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
  `]
})
export class DatePickerDemoComponent {}
