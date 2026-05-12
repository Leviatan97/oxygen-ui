import { Component, input, output, signal, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FileItem {
  file: File;
  preview?: string;
}

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
      <div class="oxy-file-list">
        @for (fileInfo of files(); track fileInfo.file.name) {
          <div class="oxy-file-item">
            <div class="oxy-file-preview">
              @if (isImage(fileInfo.file)) {
                <img [src]="fileInfo.preview" [alt]="fileInfo.file.name" class="oxy-file-thumbnail">
              } @else {
                <div class="oxy-file-icon-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
              }
            </div>
            <div class="oxy-file-info">
              <span class="oxy-file-name">{{ fileInfo.file.name }}</span>
              <span class="oxy-file-size">{{ formatSize(fileInfo.file.size) }}</span>
            </div>
            <button class="oxy-file-remove" (click)="removeFile(fileInfo); $event.stopPropagation()" title="Eliminar archivo">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="oxy-file-remove-icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        }
      </div>
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
  
  files = signal<FileItem[]>([]);
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
    const fileItems: FileItem[] = newFiles.map(file => ({
      file,
      preview: this.isImage(file) ? URL.createObjectURL(file) : undefined
    }));

    if (this.multiple()) {
      this.files.update(current => [...current, ...fileItems]);
    } else {
      // Revoke old object URL if exists
      const currentFiles = this.files();
      if (currentFiles.length > 0 && currentFiles[0].preview) {
        URL.revokeObjectURL(currentFiles[0].preview);
      }
      this.files.set(fileItems.slice(0, 1));
    }
    this.filesSelected.emit(this.files().map(item => item.file));
    
    // Reset input to allow selecting same file again
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  removeFile(fileItem: FileItem) {
    if (fileItem.preview) {
      URL.revokeObjectURL(fileItem.preview);
    }
    this.files.update(current => current.filter(f => f !== fileItem));
    this.filesSelected.emit(this.files().map(item => item.file));
  }

  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
