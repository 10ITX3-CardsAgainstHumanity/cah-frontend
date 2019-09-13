import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cah-scoreboard-item',
  templateUrl: './cah-scoreboard-item.component.html',
  styleUrls: ['./cah-scoreboard-item.component.scss']
})
export class CahScoreboardItemComponent implements OnInit {

  @Input()
  public points: number;

  @Input()
  public username: string;

  public constructor() {
    this.points = 0;
  }

  public ngOnInit() {
  }

}
