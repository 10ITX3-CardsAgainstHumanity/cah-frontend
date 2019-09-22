import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../../interfaces/player';

/**
 * The scoreboard list class
 * @access public
 * @class
 * @export
 * @name CahScoreboardListComponent
 */
@Component({
  selector: 'cah-scoreboard-list',
  templateUrl: './cah-scoreboard-list.component.html',
  styleUrls: ['./cah-scoreboard-list.component.scss']
})
export class CahScoreboardListComponent {

  /**
   * Player input property that display the currently playing users in the list
   * @access   public
   * @property {Player[]} players
   */
  public players$: Observable<Player[]>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() { }
}
