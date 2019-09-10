import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../interfaces/player';
import {GameRoomService} from '../../service/game-room.service';
import {takeUntil, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';

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
    this._gameRoomService.players
      .pipe(
        takeUntil(this._ngUnSub),
        tap((players: Player[]): Player[] => {
          if (players.every((player: Player) => player.points === 0)) {
            this.leadingPlayer = null;
            return players;
          }
          this.leadingPlayer = players.reduce((prev: Player, current: Player) => (prev.points > current.points) ? prev : current);
          return players;
        })
      )
      .subscribe((players: Player[]) => {
        this.players = players;
      });
  }
}
