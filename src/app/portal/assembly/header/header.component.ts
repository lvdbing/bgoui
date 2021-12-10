import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/common/models/user';
import { CommonService } from 'src/app/common/services/common/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() showFeatures: boolean = true;

  private destroy$ = new Subject();
  user: User = new User();
  isLogin: boolean = false;

  // 测试下拉菜单
  menus = [
    { label: '首页', router: '/home', icon:'up', show: true },
    { label: '注册', router: '/register', icon:'down', show: true },
    { label: '登录', router: '/login', icon:'left', show: true },
    { label: '测试01', router: '', icon:'right', show: false },
    { label: '测试02', router: '', icon:'up', show: true },
  ];

  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.commonService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;
      });
    this.commonService.loadUser();
    this.isLogin = this.commonService.checkLogin();
  }

  ngOnDestroy() {
    this.destroy$.next(0);
  }



  logout() {
    // this.commonService.confirm({
    //   nzTitle: '退出',
    //   nzContent: '确定退出当前登录用户？',
    //   nzOkText: '确认',
    //   nzOnOk: () => {
    //     this.commonService.setLoginUser(null);
    //   }
    // });
  }

}
