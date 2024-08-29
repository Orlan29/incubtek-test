import {Component, Input, ViewEncapsulation} from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { CommonModule } from '@angular/common'

type AuthNotificationType = 'success' | 'info' | 'warn';

@Component({
  selector: 'core-notification',
  standalone: true,
  template: `
    <div class="notification" [ngClass]="classes">
      <div class="flex items-center">
        <span class="notification-icon">
          <mat-icon *ngIf="type === 'info'">info</mat-icon>
          <mat-icon *ngIf="type === 'success'">check_circle</mat-icon>
          <mat-icon *ngIf="type === 'warn'">cancel</mat-icon>
        </span>
        <span>{{  message }}</span>
      </div>
      <ng-content select="button"></ng-content>
    </div>
  `,
  styleUrl: './core-notification.component.scss',
  imports: [
    MatIcon,
    CommonModule
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CoreNotification {
  @Input() message!: string;
  @Input() type: AuthNotificationType = 'info';

  get classes() {
    return {
      'notification--info': this.type == 'info',
      'notification--success': this.type == 'success',
      'notification--warn': this.type == 'warn',
    }
  }
}
