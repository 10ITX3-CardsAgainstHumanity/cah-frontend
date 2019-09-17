import {Component, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import randomString from 'node-random-string';
import {validateForm} from '../../shared/utils/validateForm';
import {CahNewGameDialogComponent} from '../../shared/components/cah-new-game-dialog/cah-new-game-dialog.component';
import {CahJoinGameDialogComponent} from '../../shared/components/cah-join-game-dialog/cah-join-game-dialog.component';

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
   * The form for joining an existing game room
   * @access   public
   * @property {FormGroup}
   */
  public form: FormGroup;

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
   * @param  {FormBuilder} _fb
   * @param  {MatDialog}   _dialog
   * @param  {Router}      _router
   * @constructor
   */
  public constructor(private readonly _fb: FormBuilder,
                     private readonly _dialog: MatDialog,
                     private readonly _router: Router) {
    this.isLoading = false;
    this._buildForm();
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
      data: {
        form: this.form
      }
    });
    dialog.afterClosed().subscribe((reason: string) => {
      const { roomId, username } = this.form.getRawValue();

      if (this.form.valid) {
        // call the websocket with the room id and the username
        // this._router.navigate(['/room', roomId]);
        // this.form.reset();
        this.isLoading = true;
      } else {
        validateForm(this.form);
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
    this.form.patchValue({ roomId: randomString(12) });
    const dialog = this._dialog.open(CahNewGameDialogComponent, {
      width: '394px',
      data: {
        form: this.form
      }
    });
    dialog.afterClosed().subscribe((reason: string) => {
      const { roomId, username } = this.form.getRawValue();

      if (this.form.valid) {
        // call the websocket with the room id and the username
        // this._router.navigate(['/room', roomId]);
        // this.form.reset();
        this.isLoading = true;
      } else {
        validateForm(this.form);
      }
    });
  }

  /**
   * Builds the form
   * @access private
   * @return {void}
   */
  private _buildForm(): void {
    this.form = this._fb.group({
      roomId:   ['', Validators.required],
      username: ['', Validators.required]
    });
  }
}
