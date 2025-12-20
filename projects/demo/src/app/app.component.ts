import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SampleComponent, ButtonComponent } from 'oxygen-ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SampleComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo';
}
