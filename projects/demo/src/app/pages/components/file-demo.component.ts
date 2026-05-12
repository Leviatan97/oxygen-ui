import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from 'oxygen-ui';

@Component({
  selector: 'app-file-demo',
  standalone: true,
  imports: [CommonModule, FileUploadComponent],
  template: `
    <div class="demo-page">
      <h1>File Upload</h1>
      <p class="description">Componente de carga de archivos que admite arrastrar y soltar (drag & drop).</p>

      <section class="demo-section">
        <h2>Básico</h2>
        <ox-file-upload (filesSelected)="onFilesSelected($event)"></ox-file-upload>
      </section>

      <section class="demo-section">
        <h2>Múltiple</h2>
        <ox-file-upload [multiple]="true" (filesSelected)="onFilesSelected($event)"></ox-file-upload>
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
export class FileDemoComponent {
  onFilesSelected(files: File[]) {
    console.log('Archivos:', files);
  }
}
