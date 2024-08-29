import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { CoreDialogType } from './core-dialog'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import {MatDialogClose, MatDialogRef} from '@angular/material/dialog'
import {ButtonComponent} from "@incubtek/ui/button/button.component";

@Component({
  selector: 'core-dialog',
  standalone: true,
  imports: [CommonModule, MatIconButton, MatIcon, ButtonComponent, MatDialogClose],
  styles: `
    .icon {
      font-size: 60px;
      height: 60px;
      width: 60px;
    }

    .info {
      color: #1867c5;
    }
  `,
  template: `
    <div class="p-4 relative">
      <button (click)="onCloseDialog()" class="absolute top-0 right-0" mat-icon-button>
        <mat-icon>close</mat-icon>
      </button>
      <div class="flex flex-col justify-between items-center">
        @if (dialogType === CoreDialogType.Success) {
          <mat-icon class="icon text-green-600">check_circle</mat-icon>
        } @else if (dialogType === CoreDialogType.Warning || dialogType === CoreDialogType.Confirm) {
          <mat-icon class="icon text-warn">cancel</mat-icon>
        } @else {
          <mat-icon class="icon info">info</mat-icon>
        }
        <div class="text-center">
          <h1 class="text-title my-2">{{ title }}</h1>
          <p *ngIf="dialogType !== CoreDialogType.Confirm" class="text-sm text-gray-500">{{ subTitle }}</p>
        </div>
        @if (dialogType === CoreDialogType.Confirm) {
          <div class="flex w-full space-x-2">
            <button
              class="w-full"
              mat-dialog-close
              outlined-button color="warn">
              Annuler
            </button>
            <button
              (click)="onContinue()"
              class="w-full"
              raised-button>
              Continuer
            </button>
          </div>
        }
      </div>
    </div>
  `,
})
export class CoreDialog {
  title!: string
  subTitle?: string
  dialogType!: CoreDialogType
  protected readonly CoreDialogType = CoreDialogType
  private _dialogRef = inject(MatDialogRef<CoreDialog>)

  public onCloseDialog(): void {
    this._dialogRef.close(false)
  }

  public onContinue(): void {
    this._dialogRef.close(true)
  }
}
