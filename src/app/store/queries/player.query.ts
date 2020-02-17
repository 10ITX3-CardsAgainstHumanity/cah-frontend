import {Injectable} from '@angular/core';
import {EntityUIQuery, Order, QueryConfig, QueryEntity} from '@datorama/akita';
import {PlayerState, PlayerUIState} from '@store/states/player.state';
import {PlayerStore} from '@store/player.store';
import {Player, PlayerUI} from '@shared/models/player.model';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * The PlayerQuery class
 * @access public
 * @class
 * @export
 * @extends QueryEntity<PlayerState, Player>
 * @name PlayerQuery
 */
@Injectable({providedIn: 'root'})
@QueryConfig({ sortBy: 'score', sortByOrder: Order.DESC })
export class PlayerQuery extends QueryEntity<PlayerState, Player> {

  public ui: EntityUIQuery<PlayerUIState>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(protected readonly _store: PlayerStore) {
    super(_store);
    this.createUIQuery();
  }

  /**
   * Selects all players with the corresponding player uis and combines the streams
   * @access public
   * @return {Observable<(Player & PlayerUI)[]>}
   */
  public selectAllWithUI(): Observable<( Player & PlayerUI )[]> {
    const players$ = this.selectAll();
    const playersUI$ = this.ui.selectAll({ asObject: true });

    return combineLatest(
      players$,
      playersUI$
    ).pipe(
      map(([ players, playersUI ]) => {
        return players.map(player => {
          return {
            ...player,
            ...playersUI[player.id]
          };
        });
      })
    );
  }

  /**
   * Selects the active player with the corresponding player ui and combines the stream
   * @access public
   * @return {Observable<(Player & PlayerUI)>}
   */
  public selectActiveWithUI(): Observable<(Player & PlayerUI)> {
    const activePlayer$ = this.selectActive();
    const activePlayerUI$ = this.ui.selectActive();

    return combineLatest(
      activePlayer$,
      activePlayerUI$
    ).pipe(
      map(([ activePlayer, activePlayerUI ]: [Player, PlayerUI]) => {
        return {
          ...activePlayer,
          ...activePlayerUI
        };
      })
    );
  }
}
