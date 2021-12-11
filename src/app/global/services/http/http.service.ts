import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';

const Method = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  httpOptions = {
    headers: new HttpHeaders({
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  }

  constructor(
    private http: HttpClient
  ) { }

  // 简单查询时调用get。
  get(url: string, successFunc: any, failFunc: any): void {
    this.commonCall(Method.GET, url, successFunc, failFunc);
  }

  // 新建时调用post。
  post(url: string, body: any, successFunc: any, failFunc: any): void {
    this.commonCall(Method.POST, url, successFunc, failFunc, body);
  }

  // 修改时调用put。
  put(url: string, body: any, successFunc: any, failFunc: any): void {
    this.commonCall(Method.PUT, url, successFunc, failFunc, body);
  }

  // 部分修改时调用patch。
  patch(url: string, body: any, successFunc: any, failFunc: any): void {
    this.commonCall(Method.PATCH, url, successFunc, failFunc, body);
  }

  // 删除时调用delete。
  delete(url: string, successFunc: any, failFunc: any): void {
    this.commonCall(Method.DELETE, url, successFunc, failFunc);
  }

  commonCall(method: string, url: string, successFunc: any, failFunc: any, body?: any): void {
    if (body) {
      console.log(method, ":", url, ", with data:", body);
    } else {
      console.log(method, ":", url);
    }
    
    let callObservable: Observable<Object> = new Observable<Object>();
    switch (method) {
      case Method.GET:
        callObservable = this.http.get(url, this.httpOptions);
        break;
      case Method.POST:
        callObservable = this.http.post(url, body, this.httpOptions);
        break;
      case Method.PUT:
        callObservable = this.http.put(url, body, this.httpOptions);
        break;
      case Method.PATCH:
        callObservable = this.http.patch(url, body, this.httpOptions);
        break;
      case Method.DELETE:
        callObservable = this.http.delete(url, this.httpOptions);
        break;
    }
    callObservable.pipe(
      tap(data => {
        console.log("return data:", data);
        successFunc(data);
      }),
      catchError((err):any => {
        console.log("return error:", err);
        if (err && err.error) {
          failFunc(err.error);
        }
        throw err;
      })
    )
    .subscribe();
  }

}
