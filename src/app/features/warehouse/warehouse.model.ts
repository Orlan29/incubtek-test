export interface IWarehouse {
  id: string;
  label: string;
  location: string;
  surface: number;
}

export interface IWarehouseRequest {
  label: string;
  location: string;
  surface: number;
}
