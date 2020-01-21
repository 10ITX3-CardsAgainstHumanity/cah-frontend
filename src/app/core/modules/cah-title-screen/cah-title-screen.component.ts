import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {CahNewGameDialogComponent} from '@shared/components/cah-new-game-dialog/cah-new-game-dialog.component';
import {CahJoinGameDialogComponent} from '@shared/components/cah-join-game-dialog/cah-join-game-dialog.component';
import {GameRoomService, ResponseMessage} from '@shared/services/game-room.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {PlayerService} from '@services/player.service';

/**
 * The title screen class
 * @access public
 * @class
 * @export
 * @name CahTitleScreenComponent
 */
@Component({
  selector: 'cah-title-screen',
  templateUrl: './cah-title-screen.component.html',
  styleUrls: ['./cah-title-screen.component.scss']
})
export class CahTitleScreenComponent implements OnInit, OnDestroy {

  /**
   * States if the title screen is loading currently
   * @access   public
   * @property {boolean} isLoading
   * @default  false
   */
  public isLoading: boolean;

  /**
   * The spinner dialog reference
   * @access   private
   * @property {TemplateRef<any>} _spinnerDialog
   */
  @ViewChild('spinnerDialog')
  private _spinnerDialog: TemplateRef<any>;

  /**
   * Unsub Subject
   * @access   private
   * @property {Subject<void>} _ngUnSub
   */
  private _ngUnSub: Subject<void>;

  /**
   * Assigns the defaults
   * @access public
   * @param  {FormBuilder}     _fb
   * @param  {MatDialog}       _dialog
   * @param  {Router}          _router
   * @param  {PlayerService}   _playerService
   * @param  {GameRoomService} _gameRoomService
   * @constructor
   */
  public constructor(private readonly _fb: FormBuilder,
                     private readonly _router: Router,
                     private readonly _dialog: MatDialog,
                     private readonly _playerService: PlayerService,
                     private readonly _gameRoomService: GameRoomService) {
    this.isLoading = false;
    this._ngUnSub  = new Subject<void>();
  }

  /**
   * Subscribes to $onRoomCreated and $onRoomJoined
   * @access public
   * @see    GameRoomService
   * @return {void}
   */
  public ngOnInit(): void {
    this._gameRoomService.$onRoomCreated
      .pipe(takeUntil(this._ngUnSub))
      .subscribe((response: ResponseMessage) => {
        console.log(response)
        if (this._gameRoomService.roomId) {
          this._router
            .navigate([ '/room', this._gameRoomService.roomId ])
            .then(() => {
              // successful
            }, (err) => {
              console.error(err);
            });
        }
      });
    this._gameRoomService.$onRoomJoined
      .pipe(takeUntil(this._ngUnSub))
      .subscribe((response: ResponseMessage) => {
        console.log(response)
        if (this._gameRoomService.roomId) {
          this._router
            .navigate([ '/room', this._gameRoomService.roomId ])
            .then(() => {
              // successful
            }, (err) => {
              console.error(err);
            });
        }
      });
  }

  /**
   * Pushes void through `_ngUnSub` to close down all open subscriptions
   * @access public
   * @return {void}
   */
  public ngOnDestroy(): void {
    this._ngUnSub.next();
    this._ngUnSub.complete();
  }

  /**
   * Click listener for the join room button
   * @access public
   * @param  {MouseEvent} $event
   * @return {void}
   */
  public onJoinRoomClicked($event: MouseEvent): void {
    const dialog = this._dialog.open(CahJoinGameDialogComponent, {
      width: '394px',
      data: {}
    });

    dialog.afterClosed()
          .subscribe((result: { reason: string, [prop: string]: any }) => {
            if (result.reason) {
              if (result.reason === 'join') {
                const { roomId, username } = result;
                this._gameRoomService.joinGameRoom(username, roomId);
                this._playerService.addPlayer()
                this._playerService.setActivePlayer()
              }
            }
          });
  }

  /**
   * Click listener for the new room button
   * @access public
   * @param  {MouseEvent} $event
   * @return {void}
   */
  public onNewRoomClicked($event: MouseEvent): void {
    const dialog = this._dialog.open(CahNewGameDialogComponent, {
      width: '394px',
      data: {}
    });

    dialog.afterClosed()
          .subscribe((result: { reason: string, [prop: string]: any }) => {
            if (result.reason) {
              if (result.reason === 'join') {
                const { roomId, username } = result;
                this._gameRoomService.createGameRoom(username, roomId);
              }
            }
        });
  }
}
