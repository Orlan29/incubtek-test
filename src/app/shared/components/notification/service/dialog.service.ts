import { inject, Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import {CoreDialog, CoreDialogType} from "@incubtek/ui/notification";

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private _matDialog = inject(MatDialog)
  private _notificationRef!: MatDialogRef<CoreDialog>

  open(title: string, type: CoreDialogType = CoreDialogType.Info, subTitle?: string) {
    this._notificationRef = this._matDialog.open(CoreDialog, {
      disableClose: false,
      width: '400px',
    })

    this._notificationRef.componentInstance.title = title
    this._notificationRef.componentInstance.subTitle = subTitle
    this._notificationRef.componentInstance.dialogType = type

    return this._notificationRef.afterClosed()
  }
}
