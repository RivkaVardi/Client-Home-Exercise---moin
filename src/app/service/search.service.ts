// בסיעתא דשמיא

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Office } from '../models/office.model';
import { Department } from '../models/department.model';
import { User } from '../models/user.model';

const url: string = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  public getOffices(): Observable<Office[]> {
    return this.http.get<Office[]>(url + 'offices');
  }

  public getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(url + 'departments');
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(url + 'users');
  }
}