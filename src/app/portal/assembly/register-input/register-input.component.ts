import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterReq } from 'src/app/common/models/user';
import { AccountService } from 'src/app/common/services/account/account.service';
import { CommonService } from 'src/app/common/services/common/common.service';
import { NzHelperService } from 'src/app/global/services/nz-helper/nz-helper.service';
import { UtilsService } from 'src/app/global/services/utils/utils.service';

@Component({
  selector: 'app-register-input',
  templateUrl: './register-input.component.html',
  styleUrls: ['./register-input.component.scss']
})
export class RegisterInputComponent implements OnInit {
  validateForm!: FormGroup;

  username!: string;
  password!: string;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private nzHelperService: NzHelperService,
    private utilsService: UtilsService,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      // verifyCode: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  getCaptcha() {
    // this.commonService.warning("暂不支持页面注册！");
  }

  register() {
    console.log("register clicked!");
    if (!this.validateInput()) {
      return;
    }

    var req: RegisterReq = new RegisterReq();
    req.Username = this.username;
    req.Password = this.password;
    req.Phone = this.username;
    this.accountService.register(req, (data: any) => {
      console.log("register success:", data);
    }, (err: any) => {
      console.log("register error:", err);
    });


    // this.commonService.warning("暂不支持页面注册！");

    // if (!this.validateInput()) {
    //   return;
    // }
    // let user = new User();
    // user.Username = this.username;
    // user.Password = this.password;
    // this.accountService.loginUser(user, data => {
    //   this.commonService.setLoginUser(data.Data as User);
    //   this.commonService.go("/home");
    // }, err => {
    //   this.commonService.error(err);
    // });
  }

  validateInput(): boolean {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      if (this.validateForm.controls[i].dirty && this.validateForm.controls[i].errors) {
        return false;
      }
    }
    this.username = this.validateForm.controls["userName"].value;
    this.password = this.validateForm.controls["password"].value;

    if (!this.username || this.username.trim() === '') {
      this.nzHelperService.warning("用户名不能为空");
      return false;
    }
    this.username = this.username.trim();
    if (!this.utilsService.checkMobile(this.username)) {
      this.nzHelperService.warning("请输入正确的手机号");
      return false;
    }
    if (!this.password || this.password.trim() === '') {
      this.nzHelperService.warning("密码不能为空");
      return false;
    }
    this.password = this.password.trim();

    return true;
  }

}
