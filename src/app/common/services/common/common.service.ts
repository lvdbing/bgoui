import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LocalStorageService } from 'src/app/global/services/local-storage/local-storage.service';
import { User } from '../../models/user';
import { HttpHelperService } from '../http-helper/http-helper.service';
import { USER } from '../local-storage.namespace';
import { RespError } from '../../models/errcode';
import { NzHelperService } from 'src/app/global/services/nz-helper/nz-helper.service';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // 登录的user信息，使用观察者模式进行获取；
  // 这样做的好处是，user信息是页面通用信息，一经变更，任意订阅者都可以接收到更新通知。
  private user: User = new User();
  user$: Subject<User> = new Subject<User>();

  constructor(
    private router: Router,
    private store: LocalStorageService,
    private http: HttpHelperService,
    private nzHelperService: NzHelperService,
  ) { }

  private broadcastLoginUser() {
    this.user$.next(this.user);
  }

  // loadUser 从local-storage获取用户信息。
  loadUser() {
    this.user = this.getUser();
    this.broadcastLoginUser();
  }

  // refreshUser 从数据库获取用户信息，并更新到local-storage。
  refreshUser(succFunc?: any) {
    let req = new User();
    this.callHttpPost("account/login", req, (data: any) => {
      this.setLoginUser(data.Data as User);
      if (succFunc) succFunc();
    });
  }

  // setLoginUser 设置登录用户的信息。
  // 适用于登录、退出、修改信息；
  // 退出时可传入null。
  setLoginUser(user: User) {
    if (!user) {
      this.store.remove(USER);
    } else {
      this.store.set(USER, user);
    }
    this.user = user;
    this.broadcastLoginUser();
  }

  checkLogin(): boolean {
    if (!this.user || this.user.ID <= 0) {
      return false;
    }
    return true;
  }

  mustLogin() {
    if (this.checkLogin()) {
      return;
    }
    this.nzHelperService.confirm({
      nzTitle: '请登录',
      nzContent: '此操作需要登录，请登录！',
      nzOnOk: () => {
        this.navigate(['login'], {
          queryParams: { mode: 'login' }
        });
      }
    })
  }

  // getUser 从local-storage获取用户信息。
  getUser(): User {
    return this.store.get<User>(USER);
  }

  // go 根据路由地址跳转。
  go(url: string) {
    this.router.navigateByUrl(url);
  }

  navigate(commonds: any[], extras?: NavigationExtras): Promise<boolean> {
    return this.router.navigate(commonds, extras);
  }

  // host 网站运行host。
  host(): string {
    return this.http.host();
  }

  callHttpGet(api: string, successFunc?: any, errorFunc?: any) {
    this.commonCall(this.http.getv1, api, successFunc, errorFunc);
  }

  // callHttpPost 封装了调用http post的方法，简单处理了错误信息。
  callHttpPost(api: string, body: any, successFunc?: any, errorFunc?: any) {
    this.http.postv1(api, body, (data: any) => {
      this.handleSuccFunc(data, successFunc);
    }, (err: any) => {
      this.handleErrorFunc(err, errorFunc);
    });
  }

  callHttpPut(api: string, body: any, successFunc?: any, errorFunc?: any) {
    this.http.putv1(api, body, (data: any) => {
      this.handleSuccFunc(data, successFunc);
    }, (err: any) => {
      this.handleErrorFunc(err, errorFunc)
    });
  }

  callHttpDelete(api: string, successFunc?: any, errorFunc?: any) {
    this.http.deletev1(api, (data: any) => {
      this.handleSuccFunc(data, successFunc);
    }, (err: any) => {
      this.handleErrorFunc(err, errorFunc);
    });
  }

  private commonCall(callFunc: any, api: string, succFunc?: any, errFunc?: any, body?: any) {
    if (body) {
      callFunc(api, body, (data: any) => {
        this.handleSuccFunc(data, succFunc);
      }, (err: any) => {
        this.handleErrorFunc(err, errFunc);
      });
    }
    callFunc(api, (data: any) => {}, (err: any) => {});
  }

  private handleSuccFunc(data: any, successFunc?: any) {
    if (successFunc) {
      successFunc(data);
    }
  }

  private handleErrorFunc(err: any, errorFunc?: any) {
    let respError = err as RespError;
    if (errorFunc) {
      this.nzHelperService.error(respError.Msg);
      errorFunc(respError);
    }
  }

  
  // callHttpGet(api: string, successFunc?: any, errorFunc?: any) {
  //   this.http.getv1(api, (data: any) => {
  //     this.handleSuccFunc(data, successFunc);
  //   }, (err: any) => {
  //     this.handleErrorFunc(err, errorFunc);
  //   });
  // }

  // // callHttpPost 封装了调用http post的方法，简单处理了错误信息。
  // callHttpPost(api: string, body: any, successFunc?: any, errorFunc?: any) {
  //   this.http.postv1(api, body, (data: any) => {
  //     this.handleSuccFunc(data, successFunc);
  //   }, (err: any) => {
  //     this.handleErrorFunc(err, errorFunc);
  //   });
  // }

  // callHttpPut(api: string, body: any, successFunc?: any, errorFunc?: any) {
  //   this.http.putv1(api, body, (data: any) => {
  //     this.handleSuccFunc(data, successFunc);
  //   }, (err: any) => {
  //     this.handleErrorFunc(err, errorFunc)
  //   });
  // }

  // callHttpDelete(api: string, successFunc?: any, errorFunc?: any) {
  //   this.http.deletev1(api, (data: any) => {
  //     this.handleSuccFunc(data, successFunc);
  //   }, (err: any) => {
  //     this.handleErrorFunc(err, errorFunc);
  //   });
  // }

  // // callHttpGetItems 封装了查询数据的方法。
  // // 如果不需要对查询结果进行处理，可直接调用；
  // // 如果想对结果进行处理，broadcastFunc可传null，然后用succFunc自定义处理方法。
  // callHttpGetItems(api: string, body: any, items: Array<any>, broadcastFunc?: any, succFunc?: any, errFunc?: any) {
  //   items.splice(0, items.length);
  //   this.callHttpPost(api, body,
  //     data => {
  //       if (data.Data) {
  //         data.Data.forEach(x => {
  //           items.push(x);
  //         });
  //       }
  //       if (broadcastFunc) { broadcastFunc(); }
  //       if (succFunc) { succFunc(data) }
  //     }, errFunc);
  // }

  // // callHttpAddItem 封装了添加数据的方法。
  // // 如果添加方法会传回添加的条目，可直接调用此方法；
  // // 如果添加方法不传回添加的条目，比如只传回一条信息提示添加成功，则不能直接调用此方法。
  // callHttpAddItem(api: string, body: any, items: Array<any>, broadcastFunc?: any, succFunc?: any, errFunc?: any) {
  //   this.callHttpPost(api, body,
  //     data => {
  //       if (data.Data) {
  //         // items.push(data.Data); // 添加的条目放在尾部。
  //         items.unshift(data.Data); // 添加的条目放在头部。
  //         if (broadcastFunc) { broadcastFunc(); }
  //       }
  //       if (succFunc) { succFunc(data) }
  //     }, errFunc);
  // }

  // // callHttpUpdateItem 封装了修改数据的方法。
  // // 修改成功后，会对传入的数据列表中，对应的该条数据进行替换，只支持ID匹配。
  // callHttpUpdateItem(api: string, item: any, items: Array<any>, broadcastFunc?: any, succFunc?: any, errFunc?: any) {
  //   this.callHttpPost(api, item,
  //     data => {
  //       if (data.Data) {
  //         const index = items.findIndex(x => x.ID === item.ID);
  //         if (index !== -1) {
  //           items.splice(index, 1, item);
  //           if (broadcastFunc) { broadcastFunc(); }
  //         }
  //       }
  //       if (succFunc) { succFunc(data) }
  //     }, errFunc);
  // }

  // // callHttpRemoveItem 封装了删除数据的方法。
  // // 删除成功后，会对传入的数据列表中，对应的该条数据进行删除，只支持ID匹配。
  // callHttpRemoveItem(api: string, item: any, items: Array<any>, broadcastFunc?: any, succFunc?: any, errFunc?: any) {
  //   this.callHttpPost(api, item,
  //     data => {
  //       if (data.Data) {
  //         const index = items.findIndex(x => x.ID === item.ID);
  //         if (index !== -1) {
  //           items.splice(index, 1);
  //           if (broadcastFunc) { broadcastFunc(); }
  //         }
  //       }
  //       if (succFunc) { succFunc(data) }
  //     }, errFunc);
  // }

}
