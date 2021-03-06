import { Injectable } from '@angular/core';

const ls = localStorage;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public get<T>(key: string): T {
    return JSON.parse(ls.getItem(key) || '0') as T;
  }

  public getList<T>(key: string){
    const before = ls.getItem(key);
    return before ? (JSON.parse(before) as T[]) : [];
  }

  public set(key: string, value: any): void {
    if (!value || value === undefined) {
      return;
    }
    const arr = JSON.stringify(value);
    ls.setItem(key, arr);
  }

  public remove(key: string): void {
    ls.removeItem(key);
  }
}
