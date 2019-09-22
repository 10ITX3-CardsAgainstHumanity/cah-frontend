import {Component, OnInit} from '@angular/core';
import {GameRoomService} from '../../service/game-room.service';

export enum SCOREBOARD_STATE {
  WAITING_FOR_PLAYERS,
  CZAR,
  NEXT_ROUND,
}

/**
 * The scoreboard class
 * @access public
 * @class
 * @export
 * @implements OnInit
 * @name CahScoreboardComponent
 */
@Component({
  selector: 'cah-scoreboard',
  templateUrl: './cah-scoreboard.component.html',
  styleUrls: ['./cah-scoreboard.component.scss']
})
export class CahScoreboardComponent {


  /**
   * States what the scoreboard information should show
   * @access   public
   * @property {number} informationState
   */
  public informationState: SCOREBOARD_STATE;


  /**
   * Assigns the defaults
   * @access public
   * @param  {GameRoomService} _gameRoomService
   * @constructor
   */
  public constructor(private _gameRoomService: GameRoomService) {
    this.informationState = 0;
  }
}
