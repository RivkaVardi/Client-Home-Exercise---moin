// בסיעתא דשמיא

import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  @Input() label: string = '';
  @Input() control: FormControl = new FormControl('');
  @Input() options: KeyValue<number, string>[] = [];
  filteredOptions: Observable<KeyValue<number, string>[]> = new Observable<KeyValue<number, string>[]>();

  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.control.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): KeyValue<number, string>[] {
    const filterValue = value;
    return this.options.filter(option => option.value.includes(filterValue));
  }

  displayValue(option: KeyValue<number, string>): string {
    return option ? option.value : '';
  }

  checkValue(): void {
    if (typeof this.control.value == "string") {
      const value = this.options.find(o => o.value == this.control.value);
      if (value)
        this.control.setValue(value);
      else
      {
        this.control.setValue('');
        this.control.markAsPristine();
      }
    }
  } 
}
