import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {faCrown} from '@fortawesome/free-solid-svg-icons/faCrown';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {faPortrait} from '@fortawesome/free-solid-svg-icons/faPortrait';

/**
 * A single list item of the scoreboard
 * @access public
 * @class
 * @export
 * @implements OnInit
 * @name CahScoreboardItemComponent
 */
@Component({
  selector: 'cah-scoreboard-item',
  templateUrl: './cah-scoreboard-item.component.html',
  styleUrls: ['./cah-scoreboard-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CahScoreboardItemComponent {

  /**
   * States the points of the user that he currently has
   * @access   public
   * @property {number} points
   */
  @Input()
  public set points(value: number) {
    this._points = value;
    this._cdr.markForCheck();
  }
  public get points(): number {
    return this._points;
  }

  private _points: number;

  /**
   * The username of the player
   * @access   public
   * @property {string} username
   */
  @Input()
  public set username(value: string) {
    this._username = value;
    this._cdr.markForCheck();
  }
  public get username(): string {
    return this._username;
  }

  private _username: string;

  /**
   * States if the user is leading
   * @access public
   * @property {boolean} isLeading
   */
  @Input()
  public set isLeading(value: boolean) {
    this._isLeading = value;
  }
  public get isLeading(): boolean {
    return this._isLeading;
  }

  private _isLeading: boolean;

  /**
   * States if the user is the local
   * user instance were controlling
   * @access   public
   * @property {boolean} isLocalPlayer
   * @default  boolean
   */
  @Input()
  public set isLocalPlayer(value: boolean) {
    this._isLocalPlayer = value;
    this._cdr.markForCheck();
  }
  public get isLocalPlayer(): boolean {
    return this._isLocalPlayer;
  }

  private _isLocalPlayer: boolean;

  /**
   * States if the user is the czar
   * @access   public
   * @property {boolean} isCzar
   * @default  false
   */
  @Input()
  public set isCzar(value: boolean) {
    this._isCzar = value;
    this._cdr.markForCheck();
  }
  public get isCzar(): boolean {
    return this._isCzar;
  }

  private _isCzar: boolean;

  /**
   * The icon if a user is leading
   * @access public
   * @property {IconDefinition} crownIcon
   * @default  faCrown
   */
  public crownIcon: IconDefinition;

  /**
   * The icon for the local user
   * @access   public
   * @property {IconDefinition} portraitIcon
   * @default  faPortrait
   */
  public portraitIcon: IconDefinition;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(private readonly _cdr: ChangeDetectorRef) {
    this.points        = 0;
    this.username      = '';
    this.isCzar        = false;
    this.isLeading     = false;
    this.isLocalPlayer = false;
    this.crownIcon     = faCrown;
    this.portraitIcon  = faPortrait;
  }
}
