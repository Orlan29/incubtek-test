import { Component } from '@angular/core';

@Component({
  selector: '[mp-label]',
  template: `<ng-content></ng-content>`,
  standalone: true,
  styles: [
    `
      [mt-label] {
        @apply block w-full;
      }
    `,
  ],
})
export class FormLabelComponent {}
