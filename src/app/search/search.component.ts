// בסיעתא דשמיא

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchService } from '../service/search.service';
import { Office } from '../models/office.model';
import { Department } from '../models/department.model';
import { User } from '../models/user.model';
import { KeyValue } from '@angular/common';
import { _isNumberValue } from '@angular/cdk/coercion';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm = new FormGroup({
    office: new FormControl(''),
    department: new FormControl(''),
    user: new FormControl('')
  });
  offices: Office[] = [];
  departments: Department[] = [];
  users: User[] = [];
  officesOptions: KeyValue<number, string>[] = [];
  departmentsOptions: KeyValue<number, string>[] = [];
  usersOptions: KeyValue<number, string>[] = [];

  constructor(private srv: SearchService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      office: new FormControl(''),
      department: new FormControl(''),
      user: new FormControl('')
    });
    this.srv.getOffices().subscribe(data => {
      this.offices = data;
      this.officesOptions = data.map(o => ({ key: o.id, value: o.officeName }));
    });
    this.srv.getDepartments().subscribe(data => {
      this.departments = data;
      this.departmentsOptions = data.map(d => ({ key: d.id, value: d.departmentName }));
    });
    this.srv.getUsers().subscribe(data => {
      this.users = data;
      this.usersOptions = data.map(u => ({ key: u.id, value: u.userName }));
    });
    this.searchForm.controls['office'].valueChanges.subscribe(value => {
      this.onOfficeChange(value);
    });
    this.searchForm.controls['department'].valueChanges.subscribe(value => {
      this.onDepartmentChange(value);
    });
  }

  onOfficeChange(value: any): void {
    if (value.key)
      this.departmentsOptions = this.departments.filter(d => d.officeId == value.key)
        .map(d => ({ key: d.id, value: d.departmentName }));
    else if (value == '')
      this.departmentsOptions = this.departments.map(d => ({ key: d.id, value: d.departmentName }));
  }

  onDepartmentChange(value: any): void {
    if (value.key)
      this.usersOptions = this.users.filter(u => u.departmentId == value.key)
        .map(u => ({ key: u.id, value: u.userName }));
    else if (value == '')
      this.usersOptions = this.users.map(u => ({ key: u.id, value: u.userName }));
  }

  search(): void {
    console.log(this.searchForm.value);
  }
}
