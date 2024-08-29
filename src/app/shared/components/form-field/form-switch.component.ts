import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter, HostListener,
  Input,
  Output,
} from '@angular/core';
import {NgClass} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'mp-switch',
  templateUrl: `./form-switch.components.html`,
  standalone: true,
  styles: [`
    .switch--disabled {
      @apply text-gray-400 cursor-not-allowed select-none;
      & .box-ring {
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    FormsModule
  ]
})
export class FormSwitchComponent {
  @Input() label!: string;
  @Input() color: "primary" | "accent" = "primary";
  @Input({ transform: booleanAttribute }) isOn!: boolean;
  @Output() isOnChange = new EventEmitter<boolean>(this.isOn);
  @Input({ transform: booleanAttribute }) disabled!: boolean;

  onSwitch(value: boolean): void {
    this.isOnChange.emit(value);
  }
}
