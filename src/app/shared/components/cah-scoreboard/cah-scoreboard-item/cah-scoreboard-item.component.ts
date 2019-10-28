import {Component, Input, OnInit} from '@angular/core';
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
  styleUrls: ['./cah-scoreboard-item.component.scss']
})
export class CahScoreboardItemComponent {

  /**
   * States the points of the user that he currently has
   * @access   public
   * @property {number} points
   */
  @Input()
  public points: number;

  /**
   * The username of the player
   * @access   public
   * @property {string} username
   */
  @Input()
  public username: string;

  /**
   * States if the user is leading
   * @access public
   * @property {boolean} isLeading
   */
  @Input()
  public isLeading: boolean;

  /**
   * States if the user is the local
   * user instance were controlling
   * @access   public
   * @property {boolean} isLocalPlayer
   * @default  boolean
   */
  @Input()
  public isLocalPlayer: boolean;

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
  public constructor() {
    this.points        = 0;
    this.username      = '';
    this.isLeading     = false;
    this.isLocalPlayer = false;
    this.crownIcon     = faCrown;
    this.portraitIcon  = faPortrait;
  }
}
