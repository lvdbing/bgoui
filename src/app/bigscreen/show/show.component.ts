import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.body.style.background = '#0b0f34';
  }

}
