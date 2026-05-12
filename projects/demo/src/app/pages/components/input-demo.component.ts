import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from 'oxygen-ui';

@Component({
  selector: 'app-input-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent],
  template: `
    <div class="demo-page">
      <h1>Input</h1>
      <p class="description">Campos de entrada de texto versátiles con soporte para etiquetas y feedback.</p>

      <section class="demo-section">
        <h2>Básico</h2>
        <div class="demo-grid">
          <ox-input label="Nombre de usuario" placeholder="Ej. juanito123"></ox-input>
          <ox-input label="Correo Electrónico" placeholder="tu@email.com"></ox-input>
        </div>
      </section>

      <section class="demo-section">
        <h2>Estados</h2>
        <div class="demo-grid">
          <ox-input label="Deshabilitado" [disabled]="true" value="No puedes tocar esto"></ox-input>
          <ox-input label="Con error" error="El correo no es válido" value="correo@ejemplo"></ox-input>
          <ox-input label="Ayuda" hint="Ingresa tu correo institucional"></ox-input>
        </div>
      </section>

      <section class="demo-section">
        <h2>Colores de Foco</h2>
        <p>Puedes personalizar el color del borde y el resplandor cuando el campo está activo.</p>
        <div class="demo-grid">
          <ox-input label="Foco Primario" focusColor="primary" placeholder="Azul (default)"></ox-input>
          <ox-input label="Foco Éxito" focusColor="success" placeholder="Verde"></ox-input>
          <ox-input label="Foco Peligro" focusColor="danger" placeholder="Rojo"></ox-input>
          <ox-input label="Foco Advertencia" focusColor="warning" placeholder="Naranja"></ox-input>
          <ox-input label="Foco Información" focusColor="info" placeholder="Cian"></ox-input>
        </div>
      </section>

      <section class="demo-section">
        <h2>Float Label</h2>
        <p>La etiqueta se desplaza hacia arriba cuando el campo recibe el foco o tiene contenido. Disponible en las tres variantes.</p>
        <div class="demo-grid">
          <ox-input label="Variante Estándar" [floatLabel]="true" variant="default" placeholder=" "></ox-input>
          <ox-input label="Variante Fieldset" [floatLabel]="true" variant="fieldset"></ox-input>
          <ox-input label="Variante One Line" [floatLabel]="true" variant="oneLine" placeholder=" "></ox-input>
        </div>
      </section>

      <section class="demo-section">
        <h2>Variantes de Diseño</h2>
        <div class="demo-grid">
          <ox-input label="Estándar" variant="default" placeholder="Borde normal completol"></ox-input>
          <ox-input label="Fieldset" variant="fieldset" placeholder="Etiqueta en el borde"></ox-input>
          <ox-input label="One Line" variant="oneLine" placeholder="Borde solo inferior"></ox-input>
        </div>
      </section>

      <section class="demo-section">
        <h2>Tamaños</h2>
        <div class="demo-grid">
          <ox-input label="Pequeño" size="sm" placeholder="Input pequeño"></ox-input>
          <ox-input label="Mediano" size="md" placeholder="Input mediano"></ox-input>
          <ox-input label="Grande" size="lg" placeholder="Input grande"></ox-input>
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
    .demo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
  `]
})
export class InputDemoComponent {}