import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'mp-form-error',
  template: `<ng-content></ng-content>`,
  standalone: true,
  imports: [CommonModule],
})
export class FormErrorComponent {
  @HostBinding('class')
  get classes() {
    return `text-warn text-sm font-semibold font-rale`;
  }
}
