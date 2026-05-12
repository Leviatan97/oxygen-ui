import { Component, input, output, computed, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ox-paginator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ox-paginator">
      <button 
        class="ox-paginator-button" 
        [disabled]="isFirstPage()" 
        (click)="changePage(0)"
        title="First Page">
        <span class="ox-paginator-icon">«</span>
      </button>
      <button 
        class="ox-paginator-button" 
        [disabled]="isFirstPage()" 
        (click)="changePage(page() - 1)"
        title="Previous Page">
        <span class="ox-paginator-icon">‹</span>
      </button>

      <div class="ox-paginator-pages">
        @for (p of visiblePages(); track p) {
          <button 
            class="ox-paginator-page" 
            [class.ox-paginator-page-active]="p === page()"
            (click)="changePage(p)">
            {{ p + 1 }}
          </button>
        }
      </div>

      <button 
        class="ox-paginator-button" 
        [disabled]="isLastPage()" 
        (click)="changePage(page() + 1)"
        title="Next Page">
        <span class="ox-paginator-icon">›</span>
      </button>
      <button 
        class="ox-paginator-button" 
        [disabled]="isLastPage()" 
        (click)="changePage(pageCount() - 1)"
        title="Last Page">
        <span class="ox-paginator-icon">»</span>
      </button>
      
      <span class="ox-paginator-current">
        Showing {{ first() + 1 }} to {{ last() }} of {{ totalRecords() }}
      </span>
    </div>
  `,
  styleUrl: './paginator.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {
  totalRecords = input<number>(0);
  rows = input<number>(10);
  page = input<number>(0);
  
  onPageChange = output<{page: number, rows: number}>();

  pageCount = computed(() => Math.ceil(this.totalRecords() / this.rows()) || 1);
  isFirstPage = computed(() => this.page() === 0);
  isLastPage = computed(() => this.page() === this.pageCount() - 1);
  
  first = computed(() => this.page() * this.rows());
  last = computed(() => Math.min((this.page() + 1) * this.rows(), this.totalRecords()));

  visiblePages = computed(() => {
    const total = this.pageCount();
    const current = this.page();
    let start = Math.max(0, current - 2);
    let end = Math.min(total, start + 5);
    
    if (end - start < 5) {
      start = Math.max(0, end - 5);
    }
    
    const pages = [];
    for (let i = start; i < end; i++) pages.push(i);
    return pages;
  });

  changePage(p: number) {
    if (p >= 0 && p < this.pageCount() && p !== this.page()) {
      this.onPageChange.emit({ page: p, rows: this.rows() });
    }
  }
}
