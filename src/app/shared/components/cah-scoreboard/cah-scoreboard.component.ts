import {Component, OnInit} from '@angular/core';
import {GameRoomService} from '../../service/game-room.service';
import {Observable, timer} from 'rxjs';
import {map, take} from 'rxjs/operators';

export enum SCOREBOARD_STATE {
  WAITING_FOR_PLAYERS,
  ROOM_FULL_STARTING_IN,
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
   * The countdown for the next round
   * @access public
   * @property {Observable<number>} countdown$
   */
  public countdown$: Observable<number>;

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
    let countdown = 5;

    this.informationState = 0;
    this.countdown$ = timer(1000, 1000)
      .pipe(
        map(x => countdown--),
        take(countdown + 1)
      );
  }

  /**
   * Gets triggered if the room is full (e.g. has a count of 4 players)
   * @access public
   * @return {void}
   */
  public onRoomFull(): void {
    this.informationState = SCOREBOARD_STATE.ROOM_FULL_STARTING_IN;
  }
}
