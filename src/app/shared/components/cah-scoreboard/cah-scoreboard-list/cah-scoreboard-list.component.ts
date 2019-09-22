import {Component} from '@angular/core';
import {Player} from '../../../interfaces/player';
import {Observable} from 'rxjs';
import {GameRoomService} from '../../../service/game-room.service';

/**
 * The scoreboard list class
 * @access public
 * @class
 * @export
 * @name CahScoreboardListComponent
 */
@Component({
  selector: 'cah-scoreboard-list',
  templateUrl: './cah-scoreboard-list.component.html',
  styleUrls: ['./cah-scoreboard-list.component.scss']
})
export class CahScoreboardListComponent {

  /**
   * Player input property that display the currently playing users in the list
   * @access   public
   * @property {Player[]} players
   */
  public players$: Observable<Player[]>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(private readonly _gameRoomService: GameRoomService) {
    this.players$ = this._gameRoomService.players$;
  }
}
