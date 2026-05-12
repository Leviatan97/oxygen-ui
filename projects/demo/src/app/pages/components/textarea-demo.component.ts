import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextareaComponent } from 'oxygen-ui';

@Component({
  selector: 'app-textarea-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, TextareaComponent],
  template: `
    <div class="demo-page">
      <h1>Textarea</h1>
      <p class="description">Campo de texto multilínea.</p>

      <section class="demo-section">
        <h2>Básico</h2>
        <ox-textarea label="Comentarios" placeholder="Escribe aquí..."></ox-textarea>
      </section>

      <section class="demo-section">
        <h2>Filas personalizadas</h2>
        <ox-textarea label="Descripción larga" [rows]="10" placeholder="Este textarea es más alto..."></ox-textarea>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 800px; padding: 2rem; }
    h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .description { font-size: 1.125rem; color: #64748b; margin-bottom: 3rem; }
    .demo-section { margin-bottom: 4rem; }
    .demo-section h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.5rem; }
  `]
})
export class TextareaDemoComponent {}
