import { Component, input, output, signal, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ox-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="oxy-file-upload" 
         [class.oxy-file-upload--disabled]="disabled()"
         [class.oxy-file-upload--dragging]="isDragging()"
         (dragover)="onDragOver($event)"
         (dragleave)="onDragLeave($event)"
         (drop)="onDrop($event)"
         (click)="fileInput.click()">
      
      <input 
        #fileInput 
        type="file" 
        class="oxy-file-upload-input" 
        [multiple]="multiple()" 
        [accept]="accept()"
        [disabled]="disabled()"
        (change)="onFileSelect($event)">

      <div class="oxy-file-upload-content">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="oxy-file-upload-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
        </svg>
        <div class="oxy-file-upload-text">
          @if (isDragging()) {
            <span>Soltar archivos aquí</span>
          } @else {
            <span><strong>Haz click para subir</strong> o arrastra archivos</span>
            <span class="oxy-file-upload-hint">{{ hint() || 'Máx. 5MB por archivo' }}</span>
          }
        </div>
      </div>
    </div>

    @if (showList() && files().length > 0) {
      <ul class="oxy-file-list">
        @for (file of files(); track file.name) {
          <li class="oxy-file-item">
            <span class="oxy-file-name">{{ file.name }}</span>
            <button class="oxy-file-remove" (click)="removeFile(file)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </li>
        }
      </ul>
    }
  `,
  styleUrl: './file-upload.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FileUploadComponent {
  multiple = input<boolean>(false);
  accept = input<string>('*');
  disabled = input<boolean>(false);
  hint = input<string>();
  showList = input<boolean>(true);

  filesSelected = output<File[]>();
  
  files = signal<File[]>([]);
  isDragging = signal<boolean>(false);

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  onDragOver(event: DragEvent) {
    if (this.disabled()) return;
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    if (this.disabled()) return;
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
    
    if (event.dataTransfer?.files) {
      this.handleFiles(Array.from(event.dataTransfer.files));
    }
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
    }
  }

  private handleFiles(newFiles: File[]) {
    if (this.multiple()) {
      this.files.update(current => [...current, ...newFiles]);
    } else {
      this.files.set(newFiles.slice(0, 1));
    }
    this.filesSelected.emit(this.files());
    
    // Reset input to allow selecting same file again
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  removeFile(file: File) {
    this.files.update(current => current.filter(f => f !== file));
    this.filesSelected.emit(this.files());
  }
}
