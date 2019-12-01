import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Player} from '@shared/models/player.model';
import {PlayerQuery} from '@store/queries/player.query';
import {PlayerService} from '@services/player.service';
import {PlayerStore} from '@store/player.store';
import {GameRoomStore} from '@store/game-room.store';
import {WhiteCard} from '@shared/models/white-card.model';

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
                     private readonly _playerStore: PlayerStore,
                     private readonly _gameRoomStore: GameRoomStore,
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

    const whiteCards = [
      <WhiteCard>{id: 0, text: 'dasdas', playerId: '0', dummy: true }
    ];

    this._gameRoomStore.updateSelectedBlackCard({playerId: '0', text: '____dsa', maxPlayableWhiteCards: 1, id: '1', dummy: false });
    this._gameRoomStore.addSelectedWhiteCards(whiteCards);
    this._playerService.addPlayer(0, 'P1', '666');
    this._playerStore.setActive(0);
    this._playerService.addPlayer(1, 'P2', '667');
    this._playerService.addPlayer(2, 'P3', '668');
    this._playerService.addPlayer(3, 'P4', '669');
    this._playerService.addPlayer(4, 'P5', '670');
    this._playerService.addPlayer(5, 'P6', '671');
    this._playerService.addPlayer(6, 'P7', '672');
    this._playerService.addPlayer(7, 'P8', '673');
    this._playerService.setPlayerPoints(2, 100);
    setTimeout(() => {
      this._playerService.setPlayerPoints(0, 200);
    }, 2000);
    setTimeout(() => {
      this._playerService.setPlayerPoints(3, 400);
      this._playerService.changeCzarTo(2);
      this._gameRoomStore.updateSelectedWhiteCards(whiteCards, { dummy: false, text: 'fdfafdsafds' });
    }, 4000);
  }
}
