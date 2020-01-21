import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Player} from '@shared/models/player.model';
import {PlayerQuery} from '@store/queries/player.query';
import {PlayerService} from '@services/player.service';

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
export class CahScoreboardComponent implements OnInit {

  /**
   * Observable player object
   * @access   public
   * @property {Observable<Player[]>}
   */
  public players$: Observable<Player[]>;

  /**
   * The local player / client
   * @access   public
   * @property {Observable<Player>} localPlayer$
   */
  public localPlayer$: Observable<Player>;

  /**
   * The currently leading Player
   * @access   public
   * @property {Observable<Player>} leadingPlayer$
   */
  public leadingPlayer$: Observable<Player>;

  /**
   * The czar of the current round
   * @access public
   * @property {Observable<Player>} czarPlayer$
   */
  public czarPlayer$: Observable<Player>;

  /**
   * States if the data is loading
   * @access   public
   * @property {Observable<boolean>} isLoading$
   */
  public isLoading$: Observable<boolean>;

  /**
   * Assigns the defaults
   * @access public
   * @param {PlayerQuery}   _playerQuery
   * @param {PlayerService} _playerService
   * @constructor
   */
  public constructor(private readonly _playerQuery: PlayerQuery,
                     private readonly _playerService: PlayerService) {}

  /**
   * Get all players from the store
   * @inheritDoc
   * @access public
   * @return {void}
   */
  public ngOnInit(): void {
    this.players$       = this._playerQuery.selectAll();
    this.isLoading$     = this._playerQuery.isLoading$;
    this.localPlayer$   = this._playerQuery.localPlayer$;
    this.leadingPlayer$ = this._playerQuery.leadingPlayer$;
    this.czarPlayer$    = this._playerQuery.czarPlayer$;
  }
}
