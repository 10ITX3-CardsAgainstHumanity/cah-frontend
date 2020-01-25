import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Player} from '@shared/models/player.model';

/**
 * The scoreboard class
 * @access public
 * @class
 * @export
 * @implements OnInit
 * @name CahScoreboardComponent
 */
@Component({
  selector: 'cah-scoreboard',
  templateUrl: './cah-scoreboard.component.html',
  styleUrls: ['./cah-scoreboard.component.scss']
})
export class CahScoreboardComponent {

  /**
   * Observable player object
   * @access    public
   * @property  {Observable<Player[]>}
   * @decorator Input
   */
  @Input()
  public players$: Observable<Player[]>;

  /**
   * The local player / client
   * @access    public
   * @property  {Observable<Player>} localPlayer$
   * @decorator Input
   */
  @Input()
  public localPlayer$: Observable<Player>;

  /**
   * The currently leading Player
   * @access    public
   * @property  {Observable<Player>} leadingPlayer$
   * @decorator Input
   */
  @Input()
  public leadingPlayer$: Observable<Player>;

  /**
   * The czar of the current round
   * @access    public
   * @property  {Observable<Player>} czarPlayer$
   * @decorator Input
   */
  @Input()
  public czarPlayer$: Observable<Player>;

  /**
   * States if the data is loading
   * @access    public
   * @property  {Observable<boolean>} isLoading$
   * @decorator Input
   */
  @Input()
  public isLoading$: Observable<boolean>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {}
}
