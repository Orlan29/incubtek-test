import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from "@angular/common";


type ButtonPalette = 'primary' | 'accent' | 'warn';

const BUTTON_ATTRIBUTES: string[] = [
  'raised-button',
  'outlined-button',
  'filled-button',
  'text-button'
]

@Component({
  selector: 'button[mp-button], button[raised-button], button[filled-button], button[outlined-button], button[text-button]',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() color: ButtonPalette = 'primary';
  @Input() disabled!: boolean;
  @Input({transform: booleanAttribute}) isLoading!: boolean;
  @Input({ transform: booleanAttribute}) rounded!: boolean;

  constructor(private _el: ElementRef) {
    BUTTON_ATTRIBUTES.forEach(attr => {
      if (this._hasHostAttributes(attr)) {
        this._getHostElement()?.classList.add(`mp-${attr}-container`);
      }
    })

    this._getHostElement()?.classList.add('mp-button-base');
  }

  @HostBinding('class')
  get classes() {
    return {
      'button-primary': this.color == 'primary',
      'button-accent': this.color == 'accent',
      'button-warn': this.color == 'warn',
      'button--disabled': this.disabled || this.isLoading,
      'button--loading': this.isLoading,
      'button--rounded': this.rounded
    }
  }

  protected _getHostElement(): HTMLElement {
    return this._el.nativeElement as HTMLElement;
  }

  protected _hasHostAttributes(...attributes: string[]) {
    return attributes.some(attr => this._getHostElement()?.hasAttribute(attr));
  }
}
