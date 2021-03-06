import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common/services/common/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;

  username!: string;
  password!: string;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    // private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      verifyCode: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  getCaptcha() {
    // this.commonService.warning("暂不支持页面注册！");
  }

  register() {
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
