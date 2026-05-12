import { Component } from '@angular/core';
import { MenubarComponent, CardComponent, MenuItem } from 'oxygen-ui';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menubar-demo',
  standalone: true,
  imports: [CommonModule, MenubarComponent, CardComponent],
  template: `
    <div class="demo-container">
      <h1>Menubar</h1>
      <p class="demo-description">Menubar is a horizontal menu component.</p>

      <section class="demo-section">
        <ox-card>
          <div class="p-4" style="min-height: 200px;">
            <ox-menubar [model]="items"></ox-menubar>
          </div>
        </ox-card>
      </section>

      <section class="demo-section mt-4">
        <ox-card>
          <div class="p-4">
            <h5>With Input End Template (Optional)</h5>
            <p>The menubar can also include custom content at the end.</p>
            <ox-menubar [model]="items">
              <ng-template #end>
                <input type="text" placeholder="Search" style="padding: 0.5rem; border-radius: 4px; border: 1px solid #ddd;" />
              </ng-template>
            </ox-menubar>
          </div>
        </ox-card>
      </section>
    </div>
  `,
  styles: [`
    .demo-container { padding: 2rem; max-width: 1200px; margin: 0 auto; }
    .demo-section { margin-bottom: 2rem; }
    .demo-description { color: var(--text-muted); margin-bottom: 2rem; }
    h1 { margin-bottom: 0.5rem; }
    h5 { margin-bottom: 1rem; font-weight: 600; }
  `]
})
export class MenubarDemoComponent {
  items: MenuItem[] = [
    {
      label: 'File',
      icon: 'pi pi-fw pi-file',
      items: [
        { label: 'New', icon: 'pi pi-fw pi-plus' },
        { label: 'Open', icon: 'pi pi-fw pi-external-link' },
        { separator: true },
        { label: 'Export', icon: 'pi pi-fw pi-upload' }
      ]
    },
    {
      label: 'Edit',
      icon: 'pi pi-fw pi-pencil',
      items: [
        { label: 'Left', icon: 'pi pi-fw pi-align-left' },
        { label: 'Right', icon: 'pi pi-fw pi-align-right' },
        { label: 'Center', icon: 'pi pi-fw pi-align-center' },
        { label: 'Justify', icon: 'pi pi-fw pi-align-justify' }
      ]
    },
    {
      label: 'Users',
      icon: 'pi pi-fw pi-user',
      items: [
        { label: 'New', icon: 'pi pi-fw pi-user-plus' },
        { label: 'Delete', icon: 'pi pi-fw pi-user-minus' },
        {
          label: 'Search',
          icon: 'pi pi-fw pi-users',
          items: [
            { label: 'Filter', icon: 'pi pi-fw pi-filter' },
            { label: 'List', icon: 'pi pi-fw pi-list' }
          ]
        }
      ]
    },
    {
      label: 'Events',
      icon: 'pi pi-fw pi-calendar',
      items: [
        { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
        { label: 'Archived', icon: 'pi pi-fw pi-calendar-times' }
      ]
    },
    {
      label: 'Quit',
      icon: 'pi pi-fw pi-power-off'
    }
  ];
}


