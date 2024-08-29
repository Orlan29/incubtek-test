import {Component, inject, OnInit, signal} from "@angular/core";
import {ButtonComponent} from "@incubtek/ui/button/button.component";
import {MatIcon} from "@angular/material/icon";
import {DataTableColumn, DataTableConfig, DatatableModule} from "@incubtek/ui/datatable";
import {WarehouseService} from "@incubtek/features/warehouse/services/warehouse.service";
import {IWarehouse} from "@incubtek/features/warehouse/warehouse.model";
import {MatDialog} from "@angular/material/dialog";
import {WarehouseDialogComponent} from "@incubtek/features/warehouse/container/warehouse-dialog/warehouse-dialog.component";
import {DialogService} from "@incubtek/ui/notification/service/dialog.service";
import {CoreDialogType} from "@incubtek/ui/notification";
import {EMPTY, switchMap, tap} from "rxjs";
import {map} from "rxjs/operators";
import {WarehouseFirebaseService} from "@incubtek/features/warehouse/services/warehouse-firebase.service";

@Component({
  selector: '',
  templateUrl: './warehouse.component.html',
  standalone: true,
  imports: [
    ButtonComponent,
    MatIcon,
    DatatableModule
  ],
  providers: [WarehouseService]
})
export class WarehouseComponent implements OnInit {
  private _matDialog = inject(MatDialog);
  private _dialogService = inject(DialogService);
  private _warehouseService = inject(WarehouseService);
  private _warehouseFirebaseService = inject(WarehouseFirebaseService);

  public config: DataTableConfig = {
    property: 'warehouse',
    uniqueIdentifier: 'id',
    hasActions: true,
    rowClickable: false,
  };

  public columns: DataTableColumn<IWarehouse>[] = [
    {
      prop: 'label',
      name: 'Libélé',
      type: 'string',
    },
    {
      prop: 'surface',
      name: 'Superficie (m²)',
      type: 'htmlContent',
      handleHtmlContent: (warehouse) => `<span class="inline-block py-1 px-3 rounded-full bg-green-300">${warehouse.surface}</span>`
    },
    {
      prop: 'location',
      name: 'Place',
      type: 'string',
    },
  ];

  public warehouses = this._warehouseService.warehouses;
  public isLoading = signal<boolean>(false);

  ngOnInit() {
    this.isLoading.set(true);
    this._warehouseFirebaseService.getWarehouses()
      .pipe(tap(() => this.isLoading.set(false)))
      .subscribe(warehouses => this._warehouseService.addWarehouses(warehouses))
  }

  public edit(row: IWarehouse): void {
    this._matDialog.open(WarehouseDialogComponent, {
      width: '480px',
      data: {
        title: 'Modifier un entrepôt',
        type: 'edit',
        item: row
      }
    })
  }

  public delete(row: IWarehouse): void {
    this._dialogService.open('Voulez-vous supprimer cet élément ?', CoreDialogType.Confirm).pipe(
      map(result => !!result),
      switchMap((result) => result ? this._warehouseFirebaseService.deleteWarehouse(row.id) : EMPTY)
    ).subscribe({
      next: () => {
        this._warehouseService.removeWarehouse(row.id);
      },
      error: () => {}
    })
  }

  public addWarehouse(): void {
    this._matDialog.open(WarehouseDialogComponent, {
      width: '480px',
      data: {
        title: 'Ajouter un entrepôt',
        type: 'add',
        item: null
      }
    })
  }
}
