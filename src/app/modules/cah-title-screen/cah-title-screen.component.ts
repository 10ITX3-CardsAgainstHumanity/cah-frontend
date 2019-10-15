import {Component, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {CahNewGameDialogComponent} from '../../shared/components/cah-new-game-dialog/cah-new-game-dialog.component';
import {CahJoinGameDialogComponent} from '../../shared/components/cah-join-game-dialog/cah-join-game-dialog.component';
import {GameRoomService} from '../../shared/service/game-room.service';

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
export class CahTitleScreenComponent {

  /**
   * The spinner dialog reference
   * @access   private
   * @property {TemplateRef<any>} _spinnerDialog
   */
  @ViewChild('spinnerDialog')
  private _spinnerDialog: TemplateRef<any>;

  /**
   * States if the title screen is loading currently
   * @access   public
   * @property {boolean} isLoading
   * @default  false
   */
  public isLoading: boolean;

  /**
   * Assigns the defaults
   * @access public
   * @param  {FormBuilder}     _fb
   * @param  {MatDialog}       _dialog
   * @param  {Router}          _router
   * @param  {GameRoomService} _gameRoomService
   * @constructor
   */
  public constructor(private readonly _fb: FormBuilder,
                     private readonly _router: Router,
                     private readonly _dialog: MatDialog,
                     private readonly _gameRoomService: GameRoomService) {
    this.isLoading = false;
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
                const spinnerDialog = this.openSpinnerDialog();
                const { gameId, username } = result;

                this._gameRoomService.createGameRoom(username, gameId);

              } else if (result.reason === 'cancel') {

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
              const spinnerDialog = this.openSpinnerDialog();
              const { gameId, username } = result;

              this._gameRoomService.joinGameRoom(username, gameId);
            } else if (result.reason === 'cancel') {

            }
          }
        });
  }

  /**
   * Opens a spinner dialog
   * @access public
   * @return {MatDialogRef}
   */
  public openSpinnerDialog(): MatDialogRef<TemplateRef<any>> {
    return this._dialog.open(this._spinnerDialog, {
      width: '394px',
      height: '394px'
    });
  }
}
