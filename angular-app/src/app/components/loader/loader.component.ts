import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class="centered" data-testid="loader-component">
      <div class="spinner"></div>
    </div>
  `
})
export class LoaderComponent {}
