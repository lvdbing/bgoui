import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';

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
    this.commonCall(this.http.get(url, this.httpOptions), successFunc, failFunc);
  }

  // // 新建时调用post。
  // post(url: string, body: any, successFunc: any, failFunc: any): void {
  //   console.log(url);
  //   console.log(body);
  //   console.log(successFunc);
  //   console.log(failFunc);
  //   console.log(this);
  //   this.commonCall(this.http.post(url, body, this.httpOptions), successFunc, failFunc);
  // }

  // 修改时调用put。
  put(url: string, body: any, successFunc: any, failFunc: any): void {
    this.commonCall(this.http.put(url, body, this.httpOptions), successFunc, failFunc);
  }

  // 部分修改时调用patch。
  patch(url: string, body: any, successFunc: any, failFunc: any): void {
    this.commonCall(this.http.patch(url, body, this.httpOptions), successFunc, failFunc);
  }

  // 删除时调用delete。
  delete(url: string, successFunc: any, failFunc: any): void {
    this.commonCall(this.http.delete(url, this.httpOptions), successFunc, failFunc);
  }

  private commonCall(callObservable: Observable<Object>, successFunc: any, failFunc: any): void {
    console.log("you are in commonCall()");
    console.log(callObservable);
    callObservable.pipe(
      tap(data => successFunc(data)),
      catchError(err => failFunc(err))
    )
    .subscribe();
  }

  // // 简单查询时调用get。
  // get(url: string, successFunc: any, failFunc: any): void {
  //   this.http.get(url, this.httpOptions)
  //     .pipe(
  //       tap(data => {
  //         successFunc(data);
  //       }),
  //       catchError(err => failFunc(err))
  //     )
  //     .subscribe();
  // }

  // 新建时调用post。
  post(url: string, body: any, successFunc: any, failFunc: any): void {
    console.log(this);
    console.log("Post", url, "with data:", body);
    this.http.post(url, body, this.httpOptions)
      .pipe(
        tap(data => {
          successFunc(data);
        }),
        catchError(err => failFunc(err))
      )
      .subscribe();
  }

  // // 修改时调用put。
  // put(url: string, body: any, successFunc: any, failFunc: any): void {
  //   this.http.put(url, body, this.httpOptions)
  //     .pipe(
  //       tap(data => successFunc(data)),
  //       catchError(err => failFunc(err))
  //     )
  //     .subscribe();
  // }

  // // 部分修改时调用patch。
  // patch(url: string, body: any, successFunc: any, failFunc: any): void {
  //   this.http.patch(url, body, this.httpOptions)
  //     .pipe(
  //       tap(data => successFunc(data)),
  //       catchError(err => failFunc(err))
  //     )
  //     .subscribe();
  // }

  // // 删除时调用delete。
  // delete(url: string, successFunc: any, failFunc: any): void {
  //   this.http.delete(url, this.httpOptions)
  //     .pipe(
  //       tap(data => successFunc(data)),
  //       catchError(err => failFunc(err))
  //     )
  //     .subscribe();
  // }

}
