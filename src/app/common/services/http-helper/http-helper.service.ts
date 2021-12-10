import { Injectable } from '@angular/core';
import { CONF } from 'src/app/conf/conf';
import { HttpService } from 'src/app/global/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor(
    private httpService: HttpService,
  ) { }
  
  // 简单查询时调用get（v1版本）。
  getv1(api: string, successFunc: any, failFunc: any): void {
    this.commonCallV1(this.httpService.get, api, successFunc, failFunc);
  }

  // 新建时调用post（v1版本）。
  postv1(api: string, body: any, successFunc: any, failFunc: any): void {
    console.log(this);
    // this.commonCallV1(this.httpService.post, api, successFunc, failFunc, body);

    const URL = this.getHttpUrlV1(api);
    
    this.httpService.post(URL, body, (data: any) => {
      console.log(data);
      successFunc(data);
    }, (err: any) => {
      console.log(err);
      failFunc(err);
    });
  }

  // 修改时调用put（v1版本）。
  putv1(api: string, body: any, successFunc: any, failFunc: any): void {
    this.commonCallV1(this.httpService.put, api, successFunc, failFunc, body);
  }

  patchv1(api: string, body: any, successFunc: any, failFunc: any): void {
    this.commonCallV1(this.httpService.patch, api, successFunc, failFunc, body);
  }

  // 删除时调用delete（v1版本）。
  deletev1(api: string, successFunc: any, failFunc: any): void {
    this.commonCallV1(this.httpService.delete, api, successFunc, failFunc);
  }

  // // 简单查询时调用get（v1版本）。
  // getv1(url: string, successFunc: any, failFunc: any): void {
  //   const URL = this.getHttpUrlV1(url);
    
  //   this.httpService.get(URL, (data: any) => {
  //     successFunc(data);
  //   }, (err: any) => {
  //     failFunc(err);
  //   });
  // }

  // // 新建时调用post（v1版本）。
  // postv1(url: string, body: any, successFunc: any, failFunc: any): void {
  //   const URL = this.getHttpUrlV1(url);
    
  //   this.httpService.post(URL, body, (data: any) => {
  //     successFunc(data);
  //   }, (err: any) => {
  //     failFunc(err);
  //   });
  // }

  // // 修改时调用put（v1版本）。
  // putv1(url: string, body: any, successFunc: any, failFunc: any): void {
  //   const URL = this.getHttpUrlV1(url);
  //   this.httpService.put(URL, body, (data: any) => {
  //     successFunc(data);
  //   }, (err: any) => {
  //     failFunc(err);
  //   });
  // }

  // // 删除时调用delete（v1版本）。
  // deletev1(url: string, successFunc: any, failFunc: any): void {
  //   const URL = this.getHttpUrlV1(url);
  //   this.httpService.delete(URL, (data: any) => {
  //     successFunc(data);
  //   }, (err: any) => {
  //     failFunc(err);
  //   });
  // }

  private commonCallV1(callFunc: any, api: string, successFunc: any, failFunc: any, body?: any): void {
    const url = this.getHttpUrlV1(api);
    if (body) {
      callFunc(url, body, (data: any) => {
        successFunc(data);
      }, (err: any) => {
        failFunc(err);
      });
    } else {
      callFunc(url, (data: any) => {
        successFunc(data);
      }, (err: any) => {
        failFunc(err);
      });
    }
  }

  private getHttpUrlV1(api: string): string {
    if (!api.startsWith("/")) {
      api = "/" + api;
    }
    if (!api.startsWith(CONF.apiv1Prefix)) {
      api = CONF.apiv1Prefix + api;
    }
    return this.host() + api;
  }

  host(): string {
    if (CONF.isDev) {
      return CONF.devHost;
    } else {
      return CONF.prodHost;
    }
  }

}
