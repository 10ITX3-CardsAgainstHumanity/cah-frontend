import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {faCrown} from '@fortawesome/free-solid-svg-icons/faCrown';
import {faPortrait} from '@fortawesome/free-solid-svg-icons/faPortrait';
import {faAsterisk} from '@fortawesome/free-solid-svg-icons/faAsterisk';
import {faWheelchair} from '@fortawesome/free-solid-svg-icons/faWheelchair';
import {Player, PlayerUI} from '@shared/models/player.model';

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
  template: `
    <div class="scoreboard__item">
      <div class="scoreboard__item__username">
        {{ player.username }}
        <fa-icon class="scoreboard__item--czar" *ngIf="player.isCzar" [icon]="czarIcon" matTooltip="Czar"></fa-icon>
        <fa-icon class="scoreboard__item--leading" *ngIf="player.isLeading" [icon]="crownIcon" matTooltip="Leading Player"></fa-icon>
        <fa-icon class="scoreboard__item--localplayer" *ngIf="player.id === localPlayer.id" [icon]="portraitIcon" matTooltip="You"></fa-icon>
        <fa-icon class="scoreboard__item--host" *ngIf="player.isHost" [icon]="starIcon" matTooltip="Host"></fa-icon>
      </div>
      <div class="scoreboard__item__points">{{ player.points }} awesome Point(s)</div>
    </div>
  `,
  styleUrls: ['./cah-scoreboard-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CahScoreboardItemComponent {

  /**
   * The player object
   * @access   public
   * @property {(Player & PlayerUI)} player
   */
  @Input()
  public set player(player: (Player & PlayerUI)) {
    this._player = player;
  }
  public get player(): (Player & PlayerUI) {
    return this._player;
  }
  private _player: (Player & PlayerUI);

  /**
   * The active / local player object
   * @access   public
   * @property {(Player & PlayerUI)} player
   */
  @Input()
  public set localPlayer(localPlayer: (Player & PlayerUI)) {
    this._localPlayer = localPlayer;
  }
  public get localPlayer(): (Player & PlayerUI) {
    return this._localPlayer;
  }
  private _localPlayer: (Player & PlayerUI);

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
   * The icon for the host in the list
   * @access   public
   * @property {IconDefinition} starIcon
   * @default  faAsterisk
   */
  public starIcon: IconDefinition;

  /**
   * The icon for the czar
   * @access   public
   * @property {IconDefinition} czarIcon
   * @default  faWheelchair
   */
  public czarIcon: IconDefinition;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(private readonly _cdr: ChangeDetectorRef) {
    this.player        = null;
    this.localPlayer   = null;
    this.starIcon      = faAsterisk;
    this.czarIcon      = faWheelchair;
    this.crownIcon     = faCrown;
    this.portraitIcon  = faPortrait;
  }
}
