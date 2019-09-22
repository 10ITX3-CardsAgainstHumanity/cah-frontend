import {Component, OnDestroy, OnInit} from '@angular/core';
import {Player} from '../../../interfaces/player';
import {Observable, Subject} from 'rxjs';
import {GameRoomService} from '../../../service/game-room.service';
import {concatAll, distinctUntilChanged, scan, takeUntil} from 'rxjs/operators';

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
export class CahScoreboardListComponent implements OnInit, OnDestroy {

  /**
   * Player input property that display the currently playing users in the list
   * @access   public
   * @property {Player[]} players
   */
  public players$: Observable<Player[]>;

  /**
   * Unsubscribe from any open observable if the component gets destroyed
   * @access   private
   * @property {Subject<void>}
   */
  private _ngUnSub: Subject<void>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(private readonly _gameRoomService: GameRoomService) {
    this.players$ = this._gameRoomService.players$;
    this._ngUnSub = new Subject<void>();
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
        scan((currPlayer, nextPlayer) => {
          if (currPlayer.points > nextPlayer.points) {
            currPlayer.isLeading = true;
            return currPlayer;
          } else {
            currPlayer.isLeading = false;
            nextPlayer.isLeading = true;
            return nextPlayer;
          }
        }),
        distinctUntilChanged()
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
