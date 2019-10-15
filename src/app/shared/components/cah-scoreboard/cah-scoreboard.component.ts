import {Component, OnInit} from '@angular/core';
import {GameRoomService} from '../../service/game-room.service';
import {Observable, timer} from 'rxjs';
import {delay, map, take, tap} from 'rxjs/operators';
import {ROOM_STATE} from '@interfaces/game-room-state';

export enum SCOREBOARD_STATE {
  WAITING_FOR_PLAYERS,
  ROUND_IS_STARTING_IN,
  ROUND_IS_STARTING,
  CZAR,
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
   * @property {Observable<ROOM_STATE>} informationState
   */
  public informationState: Observable<ROOM_STATE>;


  /**
   * Assigns the defaults
   * @access public
   * @param  {GameRoomService} _gameRoomService
   * @constructor
   */
  public constructor(private _gameRoomService: GameRoomService) {
    let countdown = 5;

    this.informationState = this._gameRoomService.roomState$;
    this.countdown$ = timer(1000, 1000)
      .pipe(
        map(() => countdown--),
        take(countdown + 1),
        tap(this._startNextRound.bind(this)),
        delay(5000),
        tap(() => this._gameRoomService.setRoomState(ROOM_STATE.ROUND_IN_PROGRESS))
      );
  }

  /**
   * Gets triggered if the room is full (e.g. has a count of 4 players)
   * @access public
   * @return {void}
   */
  public onRoomFull(): void {
    this._gameRoomService.setRoomState(ROOM_STATE.ROUND_IS_STARTING_IN);
  }

  /**
   * Calls the websocket to kick off the next round
   * @access public
   * @return {void}
   */
  private _startNextRound(): void {
    // for now just reset the state with a timeout
    this._gameRoomService.setRoomState(ROOM_STATE.ROUND_IS_STARTING);
  }
}
