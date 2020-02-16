import {Injectable} from '@angular/core';
import {EntityStore, EntityUIStore, StoreConfig} from '@datorama/akita';
import {Player, PlayerUI} from '@shared/models/player.model';
import {PlayerState, PlayerUIState} from '@app/store/states/player.state';

/**
 * Creates a player object and returns it immediately
 * @access public
 * @param  {string}  id
 * @param  {string}  username
 * @return {Player}
 */
export function createPlayer({id, username}): Player {
  return {
    id,
    username,
    score: 0
  };
}

export function createPlayerUI({
                                 id,
                                 isHost = false,
                                 isLeading = false,
                                 isCzar = false,
                                 isDeckFilled = false
}: (Pick<Player, 'id'> & PlayerUI)) {
  return {
    id,
    isHost,
    isCzar,
    isLeading,
    isDeckFilled
  };
}

/**
 * The PlayerStore class
 * This store keeps all users that join or leave the
 * game room including our user
 * @access public
 * @class
 * @export
 * @extends EntityStore<PlayerState, Player>
 * @implements OnInit
 * @name PlayerStore
 */
@Injectable({providedIn: 'root'})
@StoreConfig({name: 'player'})
export class PlayerStore extends EntityStore<PlayerState, Player> {

  public ui: EntityUIStore<PlayerUIState>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {
    super();
    this.createUIStore().setInitialEntityState({isLeading: false, isCzar: false, isHost: false, isDeckFilled: false});
  }
}

