import {Injectable} from '@angular/core';
import {Order, QueryConfig, QueryEntity} from '@datorama/akita';
import {PlayerState} from '@store/states/player.state';
import {PlayerStore} from '@store/player.store';
import {Player} from '@shared/models/player.model';
import {Observable} from 'rxjs';
import {concatAll, flatMap, map, mergeMap, reduce, tap} from 'rxjs/operators';
import {WhiteCard} from '@shared/models/white-card.model';

/**
 * The PlayerQuery class
 * @access public
 * @class
 * @export
 * @extends QueryEntity<PlayerState, Player>
 * @name PlayerQuery
 */
@Injectable({providedIn: 'root'})
@QueryConfig({ sortBy: 'points', sortByOrder: Order.DESC })
export class PlayerQuery extends QueryEntity<PlayerState, Player> {

  /**
   * The local player that we're controlling right now
   * @access public
   * @property {Observable<Player>} localPlayer$
   */
  public localPlayer$: Observable<Player>;

  /**
   * The local players cards observable
   * @access   public
   * @property {Observable<WhiteCard[]>} localPlayerCards$
   */
  public localPlayerCards$: Observable<WhiteCard[]>;

  /**
   * Selects the leading player based on the points he has
   * @access public
   * @property {Observable<Player>} leadingPlayer$
   */
  public leadingPlayer$: Observable<Player>;

  /**
   * Selects the czar of the current round
   * @access public
   * @property {Observable<Player>} czarPlayer$
   */
  public czarPlayer$: Observable<Player>;

  /**
   * Selects the loading state of the store
   * @access   public
   * @property {Observable<boolean>} isLoading$
   */
  public isLoading$: Observable<boolean>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(protected store: PlayerStore) {
    super(store);

    this.isLoading$        = this.selectLoading();
    this.localPlayer$      = this.selectActive();
    this.localPlayerCards$ = this.selectActive(entity => entity.cards);
    this.leadingPlayer$    = this.selectAll().pipe(map((players: Player[]) => players[0]));
    this.czarPlayer$       = this.selectAll()
      .pipe(
        tap(console.log),
        concatAll(),
        reduce((accumulator: Player, currentPlayer: Player) => {
          console.log(currentPlayer, accumulator)
          if (accumulator && accumulator.isCzar) {
            return accumulator;
          } else if (currentPlayer && currentPlayer.isCzar) {
            return currentPlayer;
          }
        })
      );
  }
}
