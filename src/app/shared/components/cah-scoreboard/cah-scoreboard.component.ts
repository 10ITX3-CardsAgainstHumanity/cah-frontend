import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../interfaces/player';
import {GameRoomService} from '../../service/game-room.service';
import {takeUntil, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';

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
export class CahScoreboardComponent implements OnInit {

  /**
   * The currently leading player
   * @access   public
   * @property {Player} leadingPlayer
   */
  public leadingPlayer: Player;

  /**
   * All player currently playing in this game room
   * @access   public
   * @property {Player[]} players
   */
  public players: Player[];

  /**
   * States what the scoreboard information should show
   * @access   public
   * @property {number} informationState
   */
  public informationState: SCOREBOARD_STATE;

  /**
   * Unsubscribe from any open observable if the component gets destroyed
   * @access   private
   * @property {Subject<void>}
   */
  private _ngUnSub: Subject<void>;

  /**
   * Assigns the defaults
   * @access public
   * @param  {GameRoomService} _gameRoomService
   * @constructor
   */
  public constructor(private _gameRoomService: GameRoomService) {
    this.players = [];
    this.informationState = 0;
    this._ngUnSub = new Subject<void>();
    this.leadingPlayer = null;
  }

  /**
   * Subscribes to the players observable on the game room service
   * to keep track of the currently playing users
   * @inheritDoc
   * @access public
   * @return {void}
   */
  public ngOnInit(): void {
    this._gameRoomService.players$
      .pipe(
        takeUntil(this._ngUnSub),
        concatAll(),
        scan((currPlayer, nextPlayer) => currPlayer.points > nextPlayer.points ? currPlayer : nextPlayer),
        distinctUntilChanged(),
        tap((player: Player) => this.leadingPlayer = player)
      ).subscribe();
  }

  /**
   * Close the subscriptions
   * @access public
   * @return {void}
   */
  public ngOnDestroy(): void {
    this._ngUnSub.next();
    this._ngUnSub.complete();
  }
}
