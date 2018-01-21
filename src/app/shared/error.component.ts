import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <div class="alert alert-danger my-2">
      <strong>Oops!</strong> {{ errorText }}
    </div>
  `
})
export class ErrorComponent implements OnInit {
  @Input() msg: string;
  errorText: string;

  ngOnInit() {
    this.errorText = this.msg ? this.msg : 'An error occured. Please try again.';
  }

}
