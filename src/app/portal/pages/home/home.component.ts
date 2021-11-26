import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/common/models/user';
import { CommonService } from 'src/app/common/services/common/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private destroy$ = new Subject();
  user: User = new User();
  loggedIn: boolean = false;

  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  logout() {
    
  }
  
}
