import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validateForm} from '@shared/utils/validateForm';

interface DialogData { form: FormGroup; }

/**
 * The Join game dialog component
 * @access public
 * @class
 * @export
 * @name CahJoinGameDialogComponent
 */
@Component({
  selector: 'cah-join-game-dialog',
  templateUrl: './cah-join-game-dialog.component.html',
  styleUrls: ['./cah-join-game-dialog.component.scss']
})
export class CahJoinGameDialogComponent {

  /**
   * The form group of the join dialog
   * @access public
   * @property {FormGroup}
   */
  public form: FormGroup;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(@Inject(MAT_DIALOG_DATA) public  readonly data: DialogData,
                                              private readonly _fb: FormBuilder,
                                              private readonly dialogRef: MatDialogRef<CahJoinGameDialogComponent>) {
      this._buildForm();
  }

  /**
   * Closes the dialog
   * @access public
   * @return {void}
   */
  public closeDialog(): void {
    this.dialogRef.close({ reason: 'cancel' });
  }

  /**
   * Joins the room and validates the form beforehand
   * @access public
   * @return {void}
   */
  public joinRoom(): void {
    if (this.form.valid) {
      this.dialogRef.close({ reason: 'join', ...this.form.getRawValue() });
      this.form.reset();
    } else {
      // highlight error fields
      validateForm(this.form);
    }
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
