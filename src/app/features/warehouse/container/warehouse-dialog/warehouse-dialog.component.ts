import {Component, inject, OnInit} from "@angular/core";
import {getFormControlErrorText} from "@incubtek/core/utils";
import {
  FormErrorComponent,
  FormFieldComponent,
  FormIconComponent,
  FormInputComponent,
  FormLabelComponent
} from "@incubtek/ui/form-field";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {ButtonComponent} from "@incubtek/ui/button/button.component";
import {WarehouseService} from "@incubtek/features/warehouse/services/warehouse.service";
import {ThousandSeparatorDirective} from "@incubtek/directives";
import {MatDialogClose} from "@angular/material/dialog";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {IWarehouse} from "@incubtek/features/warehouse/warehouse.model";
import {WarehouseFirebaseService} from "@incubtek/features/warehouse/services/warehouse-firebase.service";
import {Observable, tap} from "rxjs";

export interface IDialogData {
  title: string;
  item: null | IWarehouse;
  type: 'edit' | 'add';
}

@Component({
  selector: '',
  templateUrl: './warehouse-dialog.component.html',
  standalone: true,
  imports: [
    FormErrorComponent,
    FormFieldComponent,
    FormIconComponent,
    FormInputComponent,
    FormLabelComponent,
    FormsModule,
    MatIcon,
    ReactiveFormsModule,
    ButtonComponent,
    ThousandSeparatorDirective,
    MatDialogClose
  ],
  providers: [WarehouseService]
})
export class WarehouseDialogComponent implements OnInit {
  protected readonly getFormControlErrorText = getFormControlErrorText;
  private _fb = new FormBuilder();
  public data = inject<IDialogData>(DIALOG_DATA);
  private _dialogRef = inject(DialogRef);
  private _warehouseService = inject(WarehouseService);
  private _warehouseFirebaseService = inject(WarehouseFirebaseService);

  public warehouseForm!: FormGroup;

  public get labelControl(): AbstractControl {
    return this.warehouseForm.get('label') as AbstractControl;
  }

  public get surfaceControl(): AbstractControl {
    return this.warehouseForm.get('surface') as AbstractControl;
  }

  public get locationControl(): AbstractControl {
    return this.warehouseForm.get('location') as AbstractControl;
  }

  ngOnInit(): void {
    this.warehouseForm = this._fb.group({
      label: new FormControl<string | null>(null, [Validators.required]),
      surface: new FormControl<number | null>(null, [Validators.required]),
      location: new FormControl<string | null>(null, [Validators.required]),
    });

    if (this.data.type === 'edit') {
      this.warehouseForm.patchValue({
        label: this.data.item?.label,
        surface: this.data.item?.surface,
        location: this.data.item?.location}
      );
      this.warehouseForm.updateValueAndValidity();
    }
  }

  public save(): void {
    if (this.warehouseForm.invalid) return;
    this.warehouseForm.disable()
    let response$: Observable<any>;

    if (this.data.type === 'add') {
      response$ = this._warehouseFirebaseService.addWarehouse(this.warehouseForm.value);
    } else {
      response$ = this._warehouseFirebaseService.updateWarehouse(this.data.item!.id, this.warehouseForm.value);
    }

    response$!.pipe(
      tap(responseId => {
        const warehouse = {
          id: responseId,
          ...this.warehouseForm.value,
        } as IWarehouse;

        if (this.data.type === 'add') this._warehouseService.addWarehouse(warehouse);
        else this._warehouseService.updateWarehouse(this.data.item!.id, warehouse);
      })
    ).subscribe({
      next: _ => {
        this._dialogRef.close();
        this.warehouseForm.enable();
      },
      error: (error) => console.log(error)
    })
  }
}
