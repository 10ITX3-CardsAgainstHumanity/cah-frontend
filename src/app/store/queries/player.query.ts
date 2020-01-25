import {Injectable} from '@angular/core';
import {Order, QueryConfig, QueryEntity} from '@datorama/akita';
import {PlayerState} from '@store/states/player.state';
import {PlayerStore} from '@store/player.store';
import {Player} from '@shared/models/player.model';
import {Observable} from 'rxjs';
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
   * The local players cards observable
   * @access   public
   * @property {Observable<WhiteCard[]>} localPlayerCards$
   */
  public localPlayerCards$: Observable<WhiteCard[]>;


  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(protected readonly _store: PlayerStore) {
    super(_store);

    this.localPlayerCards$ = this.selectActive(entity => entity.cards);
  }
}
