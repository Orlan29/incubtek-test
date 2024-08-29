import { CommonModule } from '@angular/common';
import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'mp-icon',
  template: `<ng-content></ng-content>`,
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      mp-icon {
        @apply -ml-10 text-gray-400 flex;
      }
    `,
  ],
})
export class FormIconComponent {}
