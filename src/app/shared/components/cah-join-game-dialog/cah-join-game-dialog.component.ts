import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormGroup} from '@angular/forms';

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
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(public dialogRef: MatDialogRef<CahJoinGameDialogComponent>,
                     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  /**
   * Closes the dialog
   * @access public
   * @return {void}
   */
  public closeDialog(): void {
    this.dialogRef.close();
  }
}
