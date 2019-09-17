import {Component, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import randomString from 'node-random-string';
import {validateForm} from '../../shared/utils/validateForm';

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
   * References the template for joining a existing room
   * @access private
   * @property {TemplateRef<any>} _joinRoomTemplateRef
   */
  @ViewChild('joinRoomRef')
  public joinRoomRef: TemplateRef<any>;

  /**
   * References the template for creating a new room
   * @access public
   * @property {TemplateRef<any>} _newRoomTemplateRef
   */
  @ViewChild('newRoomRef')
  public newRoomRef: TemplateRef<any>;

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
    const dialog = this._dialog.open(this.joinRoomRef, {
      width: '394px'
    });
    dialog.afterClosed().subscribe((reason: string) => {
      const { roomId, username } = this.form.getRawValue();

      if (this.form.valid) {
        if (reason === 'join') {
          // call the websocket with the room id and the username
          // this._router.navigate(['/room', roomId]);
          this.isLoading = true;
        } else if (reason === 'cancel') {
          this.form.reset();
        } else {
          this.form.reset();
        }
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
    const dialog = this._dialog.open(this.newRoomRef, {
      width: '394px'
    });
    dialog.afterClosed().subscribe((reason: string) => {
      const { roomId, username } = this.form.getRawValue();
      // @TODO track reasons
      if (this.form.valid) {
        if (reason === 'join') {
          // this._router.navigate(['/room', roomId]);
          this.isLoading = true;
        } else if (reason === 'cancel') {
          this.form.reset();
        } else {
          this.form.reset();
        }
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
      roomId: ['', Validators.required],
      username: ['', Validators.required]
    });
  }
}
