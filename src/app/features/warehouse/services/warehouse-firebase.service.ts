import {inject, Injectable} from "@angular/core";
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, setDoc} from "@angular/fire/firestore";
import {from, Observable} from "rxjs";
import {IWarehouse, IWarehouseRequest} from "@incubtek/features/warehouse/warehouse.model";

@Injectable({ providedIn: 'root' })
export class WarehouseFirebaseService {
  private _fireStore = inject(Firestore);
  private _warehousesCollection = collection(this._fireStore, 'warehouses');

  public getWarehouses(): Observable<IWarehouse[]> {
    return collectionData(
      this._warehousesCollection, { idField: 'id' }
    ) as Observable<IWarehouse[]>
  }

  public addWarehouse(payload: IWarehouseRequest): Observable<string> {
    const promise = addDoc(this._warehousesCollection, payload)
      .then(response => response.id);
    return from(promise);
  }

  public deleteWarehouse(warehouseId: string): Observable<void> {
    const docRef = doc(this._fireStore, 'warehouses/' + warehouseId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  public updateWarehouse(warehouseId: string, payload: IWarehouseRequest): Observable<void> {
    const docRef = doc(this._fireStore, 'warehouses/' + warehouseId);
    const promise = setDoc(docRef, payload);
    return from(promise);
  }
}
