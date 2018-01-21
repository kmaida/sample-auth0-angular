import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="text-center my-3">
      <img src="/assets/images/loading.svg" alt="Loading...">
    </div>
  `,
  styles: [`
    img {
      height: 80px;
      width: 80px;
    }
  `]
})
export class LoadingComponent { }
