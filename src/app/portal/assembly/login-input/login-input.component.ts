import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RespError } from 'src/app/common/models/errcode';
import { LoginReq } from 'src/app/common/models/user';
import { AccountService } from 'src/app/common/services/account/account.service';
import { CommonService } from 'src/app/common/services/common/common.service';
import { NzHelperService } from 'src/app/global/services/nz-helper/nz-helper.service';

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.scss']
})
export class LoginInputComponent implements OnInit {
  validateForm!: FormGroup;

  username!: string;
  password!: string;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private nzHelperService: NzHelperService,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    if (!this.validateInput()) {
      return;
    }
    let req = new LoginReq();
    req.Username = this.username;
    req.Password = this.password;
    this.accountService.login(req, (data: any) => {
      console.log(data);
      // this.commonService.setLoginUser(data.Data as User);
      // this.commonService.go("/home");
    }, (err: any) => {
      let respErr = err as RespError;
      this.nzHelperService.error(respErr.msg);
    });
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
      return false;
    }
    this.username = this.username.trim();
    if (!this.password || this.password.trim() === '') {
      return false;
    }
    this.password = this.password.trim();

    return true;
  }

}
