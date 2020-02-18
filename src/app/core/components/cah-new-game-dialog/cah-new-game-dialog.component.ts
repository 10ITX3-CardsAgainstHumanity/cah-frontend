import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validateForm} from '@shared/utils/validateForm';
import randomString from 'node-random-string';
import {faMagic} from '@fortawesome/free-solid-svg-icons/faMagic';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';

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
   * The form group of the component
   * @access   public
   * @property {FormGroup}
   */
  public form: FormGroup;

  /**
   * The icon to generate a new game id
   * @access   public
   * @property {IconDefinition} generateIcon
   */
  public generateIcon: IconDefinition;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(@Inject(MAT_DIALOG_DATA) private readonly _data: DialogData,
                                              private readonly _dialogRef: MatDialogRef<CahNewGameDialogComponent>,
                                              private readonly _fb: FormBuilder) {
    this.generateIcon = faMagic;
    this._buildForm();
  }

  /**
   * Closes the dialog
   * @access public
   * @return {void}
   */
  public closeDialog(): void {
    this._dialogRef.close({ reason: 'cancel' });
  }

  /**
   * Joins the room and validates the form beforehand
   * @access public
   * @return {void}
   */
  public joinRoom() {
    if (this.form.valid) {
      this._dialogRef.close({ reason: 'join', ...this.form.getRawValue() });
      this.form.reset();
    } else {
      validateForm(this.form);
    }
  }

  /**
   * Generates a new game room id and patches the form
   * @access public
   * @return {void}
   */
  public generateGameId(): void {
    this.form.patchValue({ roomId: randomString(12) });
  }

  /**
   * Builds the form
   * @access private
   * @return {void}
   */
  private _buildForm(): void {
    this.form = this._fb.group({
      username: ['', Validators.required],
      roomId: [randomString(12), Validators.required]
    });
  }
}
