import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../../interfaces/player';

@Component({
  selector: 'cah-scoreboard-list',
  templateUrl: './cah-scoreboard-list.component.html',
  styleUrls: ['./cah-scoreboard-list.component.scss']
})
export class CahScoreboardListComponent implements OnInit {

  @Input()
  public players: Player[];

  public constructor() { }

  ngOnInit() {
  }

}
