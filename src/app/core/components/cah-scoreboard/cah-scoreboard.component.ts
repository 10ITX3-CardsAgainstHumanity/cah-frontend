import {Component, Input, OnInit} from '@angular/core';
import {Player, PlayerUI} from '@shared/models/player.model';

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
  template: `
    <div class="scoreboard">
      <div class="scoreboard__header">
        Scoreboard
      </div>
      <div class="scoreboard__list">
        <ng-container *ngIf="!loading">
          <cah-scoreboard-item [player]="player"
                               [localPlayer]="localPlayer"
                               *ngFor="let player of players"></cah-scoreboard-item>
        </ng-container>
      </div>
      <div class="scoreboard__footer">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./cah-scoreboard.component.scss']
})
export class CahScoreboardComponent {

  /**
   * Observable player object
   * @access    public
   * @property  {Player[]}
   * @decorator Input
   */
  @Input()
  public players: (Player & PlayerUI)[];

  /**
   * The local player / client
   * @access    public
   * @property  {Player} localPlayer
   * @decorator Input
   */
  @Input()
  public localPlayer: (Player & PlayerUI);

  /**
   * States if the data is loading
   * @access    public
   * @property  {boolean} loading
   * @decorator Input
   */
  @Input()
  public loading: boolean;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {}
}
