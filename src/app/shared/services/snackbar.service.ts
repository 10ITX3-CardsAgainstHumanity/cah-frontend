import {Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The SnackbarService class
 * @access public
 * @class
 * @export
 * @implements OnInit
 * @name SnackbarService
 */
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  /**
   * The duration that the snackbar is shown
   * @access   private
   * @property {number} _duration
   */
  private _duration: number;

  /**
   * The position of the snack bar
   * @access   private
   * @property {string} _position
   */
  private _position: string;

  /**
   * Gets and sets the duration of the snackbar
   * @access   public
   * @property {number} duration
   */
  public get duration(): number {
    return this._duration;
  }
  public set duration(value: number) {
    this._duration = value;
  }

  /**
   * Gets and sets the position of the snackbar
   * @access   public
   * @property {number} position
   */
  public get position(): string {
    return this._position;
  }
  public set position(value: string) {
    this._position = value;
  }

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(private readonly _snackbar: MatSnackBar) {
    this._duration = 5000;
  }

  /**
   * Shows a snackbar
   * @access public
   * @return {void}
   */
  public show(message: string): void {
    this._snackbar.open(message, 'CLOSE', {duration: this._duration, horizontalPosition: 'end', verticalPosition: 'top' });
  }
}
