import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameRoomService, ResponseMessage} from '@services/game-room.service';
import {SnackbarService} from '@services/snackbar.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {PlayerService} from '@services/player.service';
import {Player, PlayerUI} from '@shared/models/player.model';
import {PlayerQuery} from '@store/queries/player.query';
import {GameRoomQuery} from '@store/queries/game-room.query';
import {BlackCard} from '@shared/models/black-card.model';
import {WhiteCard} from '@shared/models/white-card.model';

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
   * States if the game room is loading
   * @access public
   * @property {Observable<boolean>} gameRoomLoading$
   */
  public gameRoomLoading$: Observable<boolean>;

  /**
   * States the selected black card
   * @access   public
   * @property {Observable<BlackCard>} selectedBlackCard$
   */
  public selectedBlackCard$: Observable<BlackCard>;

  /**
   * States the selected white card
   * @access   public
   * @property {Observable<WhiteCard[]>} selectedWhiteCards$
   */
  public selectedWhiteCards$: Observable<WhiteCard[]>;

  /**
   * States the players that are currently in the game room
   * @access   public
   * @property {Observable<Player[]>} players$
   */
  public players$: Observable<(Player & PlayerUI)[]>;

  /**
   * States if the players are currently loading
   * @access   public
   * @property {Observable<boolean>} playersLoading$
   */
  public playersLoading$: Observable<boolean>;

  /**
   * States the local player
   * @access   public
   * @property {Observable<Player>} localPlayer$
   */
  public localPlayer$: Observable<(Player & PlayerUI)>;

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
   * @param  {PlayerQuery}     _playerQuery
   * @param  {GameRoomQuery}   _gameRoomQuery
   * @param  {PlayerService}   _playerService
   * @param  {GameRoomService} _gameRoomService
   * @param  {SnackbarService} _snackbarService
   */
  public constructor(private readonly _playerQuery: PlayerQuery,
                     private readonly _gameRoomQuery: GameRoomQuery,
                     private readonly _playerService: PlayerService,
                     private readonly _gameRoomService: GameRoomService,
                     private readonly _snackbarService: SnackbarService) {
    this._ngUnSub = new Subject<void>();

    this.gameRoomLoading$ = this._gameRoomQuery.selectLoading();
    this.selectedBlackCard$ = this._gameRoomQuery.selectedBlackCard$;
    this.selectedWhiteCards$ = this._gameRoomQuery.selectedWhiteCards$;

    this.players$ = this._playerQuery.selectAllWithUI();
    this.localPlayer$ = this._playerQuery.selectActiveWithUI();
    this.playersLoading$ = this._playerQuery.selectLoading();
  }

  /**
   * Subscribes to socket events
   * @access public
   * @return {void}
   */
  public ngOnInit(): void {
    this._playerService.$onPlayerJoined
      .pipe(takeUntil(this._ngUnSub))
      .subscribe();

    this._playerService.$onPlayerLeft
      .pipe(takeUntil(this._ngUnSub))
      .subscribe();

    this._gameRoomService.$onRoomPlayers
      .pipe(takeUntil(this._ngUnSub))
      .subscribe((response: ResponseMessage) => {
        this._playerService.upsertPlayers(response.msg.players);
      });

    this._gameRoomService.requestPlayers();
  }

  /**
   * Closes all open subscriptions
   * @access public
   * @return {void}
   */
  public ngOnDestroy(): void {
    this._ngUnSub.next();
    this._ngUnSub.complete();
    this._gameRoomService.leaveGameRoom();
  }

  /**
   *
   * @access public
   * @return {void}
   */
  public startGame(): void {
    this._gameRoomService.startGame();
  }
}
