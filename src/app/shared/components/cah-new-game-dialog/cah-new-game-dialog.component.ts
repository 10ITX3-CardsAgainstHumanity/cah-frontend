import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormGroup} from '@angular/forms';
import {validateForm} from '../../utils/validateForm';

interface DialogData { form: FormGroup; }

/**
 * The new game dialog component
 * @access public
 * @class
 * @export
 * @name CahNewGameDialogComponent
 */
@Component({
  selector: 'cah-new-game-dialog',
  templateUrl: './cah-new-game-dialog.component.html',
  styleUrls: ['./cah-new-game-dialog.component.scss']
})
export class CahNewGameDialogComponent {

  /**
   * States if the spinner is showing
   * @access public
   * @property {boolean} isLoading
   * @default false
   */
  public isLoading: boolean;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(public dialogRef: MatDialogRef<CahNewGameDialogComponent>,
                     @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.isLoading = false;
  }

  /**
   * Closes the dialog
   * @access public
   * @return {void}
   */
  public closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Joins the room and validates the form beforehand
   * @access public
   * @return {void}
   */
  public joinRoom() {
    if (this.data.form.valid) {
      // call the websocket with the room id and the username
      this.data.form.reset();
      this.isLoading = true;

    } else {
      validateForm(this.data.form);
    }
  }
}
