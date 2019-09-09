import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../interfaces/player';
import {GameRoomService} from '../../service/game-room.service';

@Component({
  selector: 'cah-scoreboard',
  templateUrl: './cah-scoreboard.component.html',
  styleUrls: ['./cah-scoreboard.component.scss']
})
export class CahScoreboardComponent implements OnInit {

  public leadingPlayer: Player;

  @Input()
  public players: Player[];

  public constructor(private _gameRoomService: GameRoomService) {
    this.leadingPlayer = null;
    this.players = [];
  }

  public ngOnInit() {
    this.leadingPlayer = this.players.reduce((prev: Player, current: Player) => (prev.points > current.points) ? prev : current);
  }
}
