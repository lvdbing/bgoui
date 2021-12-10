import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showRegister: boolean = false;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // 根据路由判断显示登录或注册。
    this.route.url.subscribe(
      url => {
        if (url[0].path.indexOf("register") >= 0) {
          this.showRegister = true;
        } else {
          this.showRegister = false;
        }
      }
    );
  }

}
