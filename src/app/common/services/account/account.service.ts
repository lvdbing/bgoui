import { Injectable } from '@angular/core';
import { RegisterReq } from '../../models/user';
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

}
