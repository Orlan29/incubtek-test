import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  booleanAttribute,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource } from './datatable-datasource';
import {
  DataTableColumn,
  DataTableConfig,
  TableEntity,
} from './datatable.types';

@Component({
  selector: 'app-table',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
})
export class DataTableComponent<T extends TableEntity>
  implements AfterViewInit, OnChanges, OnInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<T>;

  @Input() columns: DataTableColumn<T>[] = [];

  @Input() data: T[] = [];

  @Input() config!: DataTableConfig;

  @Input({ transform: booleanAttribute }) loading!: boolean;

  @Input() emptyMessage: string = 'Aucun element trouvé';

  @Output() rowClick: EventEmitter<T> = new EventEmitter<T>(true);

  rowSelected: SelectionModel<T> = new SelectionModel(
    false,
    [],
    true,
    (r1: T, r2: T) => {
      return (
        r1[this.config.uniqueIdentifier] === r2[this.config.uniqueIdentifier]
      );
    }
  );

  @ContentChild('actionTemplate') public actionTemplate!: TemplateRef<unknown>;
  dataSource!: DataTableDataSource<T>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      this.displayedColumns = this.columns.map((col) => col.prop);

      if (this.config?.hasActions) {
        this.displayedColumns.push('action');
      }

      if (this.config?.selection) {
        this.displayedColumns.unshift('select');
      }
    }

    if (!changes['data']?.firstChange) {
      this.dataSource = new DataTableDataSource<T>(
        changes['data']?.currentValue,
        this.columns
      );
      this._updateDatasource();
    }

    if (changes['loading']) {
      this.loading = changes['loading']?.currentValue;
    }
  }

  ngAfterViewInit(): void {
    this._updateDatasource();
  }

  ngOnInit(): void {
    this.dataSource = new DataTableDataSource<T>(this.data, this.columns);
  }

  handleRowClick(row: T) {
    this.rowSelected.select(row);
    this.rowClick.emit(row);
  }

  private _updateDatasource() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
