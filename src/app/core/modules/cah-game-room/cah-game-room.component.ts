import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameRoomService, ResponseMessage} from '@services/game-room.service';
import {SnackbarService} from '@services/snackbar.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

/**
 * The CahGameRoomComponent
 * @access public
 * @class
 * @export
 * @name CahGameRoomComponent
 */
@Component({
  selector: 'cah-game-room',
  templateUrl: './cah-game-room.component.html',
  styleUrls: ['./cah-game-room.component.scss']
})
export class CahGameRoomComponent implements OnInit, OnDestroy {

  /**
   * Subject for takeUntil in the pipes to unsubscribe
   * @access   private
   * @property {Subject<void>} _ngUnSub
   */
  private _ngUnSub: Subject<void>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   * @param  {SnackbarService} _snackbarService
   * @param  {GameRoomService} _gameRoomService
   */
  public constructor(private readonly _snackbarService: SnackbarService,
                     private readonly _gameRoomService: GameRoomService) {
    this._ngUnSub = new Subject<void>();
  }

  /**
   * Subscribes to socket events
   * @access public
   * @return {void}
   */
  public ngOnInit(): void {
    this._gameRoomService.$onPlayerJoined
      .pipe(takeUntil(this._ngUnSub))
      .subscribe((response: ResponseMessage) => {
        this._snackbarService.show(`${response.msg.username} ist dem Spiel beigetreten`);
      });

    this._gameRoomService.$onPlayerLeft
      .pipe(takeUntil(this._ngUnSub))
      .subscribe((response: ResponseMessage) => {
        this._snackbarService.show(`${response.msg.username} hat das Spiel verlassen`);
      });
  }

  /**
   * Closes all open subscriptions
   * @access public
   * @return {void}
   */
  public ngOnDestroy(): void {
    this._ngUnSub.next();
    this._ngUnSub.complete();
  }

}
