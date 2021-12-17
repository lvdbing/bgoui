import { Injectable } from '@angular/core';
import { LoginReq, RegisterReq } from '../../models/user';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private commonService: CommonService,
  ) { }

  register(req: RegisterReq, succFunc?: any, errFunc?: any) {
    this.commonService.callHttpPost("register", req, succFunc, errFunc);
  }

  login(req: LoginReq, succFunc?: any, errFunc?: any) {
    this.commonService.callHttpPost("login", req, succFunc, errFunc);
  }

}
