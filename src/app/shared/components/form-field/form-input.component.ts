import {booleanAttribute, Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: '[mp-input]',
  template: `<ng-content></ng-content>`,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .input--disabled {
      @apply bg-gray-200 cursor-not-allowed
    }
  `]
})
export class FormInputComponent {
  @Input({ transform: booleanAttribute }) disabled!: boolean;

  @HostBinding('class')
  get classes() {
    return {
      'input--disabled': this.disabled
    }
  }

}
