import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormGroup} from '@angular/forms';

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
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(public dialogRef: MatDialogRef<CahNewGameDialogComponent>,
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
