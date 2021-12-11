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
    this.httpService.get(this.getHttpUrlV1(api), successFunc, failFunc);
  }

  // 新建时调用post（v1版本）。
  postv1(api: string, body: any, successFunc: any, failFunc: any): void {
    this.httpService.post(this.getHttpUrlV1(api), body, successFunc, failFunc);
  }

  // 修改时调用put（v1版本）。
  putv1(api: string, body: any, successFunc: any, failFunc: any): void {
    this.httpService.put(this.getHttpUrlV1(api), body, successFunc, failFunc);
  }

  patchv1(api: string, body: any, successFunc: any, failFunc: any): void {
    this.httpService.patch(this.getHttpUrlV1(api), body, successFunc, failFunc);
  }

  // 删除时调用delete（v1版本）。
  deletev1(api: string, successFunc: any, failFunc: any): void {
    this.httpService.delete(this.getHttpUrlV1(api), successFunc, failFunc);
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
