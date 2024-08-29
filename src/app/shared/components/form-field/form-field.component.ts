import {ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'mp-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {}
