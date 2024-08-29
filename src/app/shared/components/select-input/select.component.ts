import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, HostBinding, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  Validators,
} from '@angular/forms';

import { fromEvent } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SelectItem } from './select.type';
import {FormFieldComponent} from "@incubtek/ui/form-field/form-field.component";
import {FormInputComponent} from "@incubtek/ui/form-field/form-input.component";

@Component({
  selector: 'mp-select',
  templateUrl: './select.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollingModule, FormFieldComponent, FormInputComponent],
})
export class SelectComponent implements OnInit, ControlValueAccessor, Validators {
  static nextId = 0;

  @HostBinding() id = `custom-ova-select-input-id-${SelectComponent.nextId++}`;

  @Input({ transform: booleanAttribute }) disabled!: boolean;

  @Input({ transform: booleanAttribute }) searchable: boolean = false;

  @Input() label!: string;

  private _items!: SelectItem[];

  @Input() placeholder!: string;

  isDropdownOpened = false;

  selectControl: FormControl = new FormControl(null);

  @Input()
  get items(): SelectItem[] {
    return this._items;
  }

  set items(items: SelectItem[]) {
    this._items = items;
  }

  get value(): any {
    return this.selectControl.value;
  }

  set value(value: any) {
    this.selectControl.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get displayValue() {
    if (!this.items.length) {
      return { value: null, label: null };
    }
    return this.items?.find((v) => v.value === this.value);
  }

  onChange: any = () => {};

  onTouched: any = () => {};

  ngOnInit(): void {
    this._closeDropdownOnOutsideClick();
  }

  registerOnChange(fn: any): void {
    this.selectControl.valueChanges.subscribe(fn);
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.selectControl.disable() : this.selectControl.enable();
  }

  writeValue(code: any): void {
    if (code) {
      this.value = code;
    }
  }

  toggleSelection(item: SelectItem) {
    this.value = item.value;
    this.isDropdownOpened = false;
  }

  toggleDropdown() {
    if (this.disabled) {
      return;
    }
    this.isDropdownOpened = !this.isDropdownOpened;
  }

  private _closeDropdownOnOutsideClick() {
    fromEvent(document, 'click').subscribe((event) => {
      if (this.isDropdownOpened) {
        this.isDropdownOpened = false;
      }
    });
  }
}
