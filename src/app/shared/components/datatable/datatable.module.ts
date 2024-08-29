import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { DataTableComponent } from "./datatable.component";

@NgModule({
  declarations: [
    DataTableComponent
  ],
  exports: [
    DataTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule
  ],
})
export class DatatableModule {}
