import {booleanAttribute, Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@Component({
  selector: 'mp-loading-progress',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  template: `
    @if(isLoading) {
      <div class="sticky top-0">
        <mat-progress-bar mode="indeterminate" color="primary"></mat-progress-bar>
      </div>
    }
  `,
})
export class LoadingProgressComponent {
  @Input({ transform: booleanAttribute }) isLoading!: boolean;
}
