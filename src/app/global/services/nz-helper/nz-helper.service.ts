import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ConfirmType, ModalOptions, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class NzHelperService {
  
  constructor(
    private messageService: NzMessageService,
    private modalService: NzModalService,
  ) { }

  // success 弹出成功消息。
  success(msg: string) {
    this.messageService.success(msg);
  }

  // warning 弹出警告消息。
  warning(msg: string) {
    this.messageService.warning(msg);
  }

  // error 弹出错误消息。
  // duration 控制消息显示时间，默认10秒。
  error(msg: string, duration?: number) {
    let du = (duration && duration > 0) ? duration : 10000;
    this.messageService.error(msg, { nzDuration: du });
  }

  // confirm 弹出确认框。
  // this.commonService.confirm({
  //   nzTitle: "退出",
  //   nzContent: "确定退出当前登录用户？",
  //   nzOnOk: () => {
  //     this.commonService.setLoginUser(null);
  //     this.commonService.go("/home");
  //   }
  // });
  confirm(options?: ModalOptions, confirmType?: ConfirmType): NzModalRef {
    return this.modalService.confirm(options, confirmType);
  }

}
