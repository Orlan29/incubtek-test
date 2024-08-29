import {computed, Injectable, signal} from "@angular/core";
import {IWarehouse} from "@incubtek/features/warehouse/warehouse.model";

@Injectable()
export class WarehouseService {
  private _warehouses = signal<IWarehouse[]>([]);
  public warehouses = computed<IWarehouse[]>(() => this._warehouses());

  public addWarehouses(warehouses: IWarehouse[]): void {
    this._warehouses.set(warehouses);
  }

  public addWarehouse(warehouse: IWarehouse): void {
    this._warehouses.update(warehouses => [warehouse, ...warehouses]);
  }

  public updateWarehouse(warehouseId: string, warehouse: IWarehouse): void {
    this._warehouses.update(warehouses => {
      return warehouses.map(w => w.id === warehouseId ? warehouse : w);
    });
  }

  public removeWarehouse(warehouseId: string): void {
    this._warehouses.update(warehouses => {
      return warehouses.filter(w => w.id !== warehouseId);
    });
  }
}
