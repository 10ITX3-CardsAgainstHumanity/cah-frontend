import {Injectable} from '@angular/core';
import {arrayAdd, arrayRemove, EntityStore, StoreConfig} from '@datorama/akita';
import {Player} from '@shared/models/player.model';
import {PlayerState} from '@app/store/states/player.state';
import {WhiteCard} from '@shared/models/white-card.model';

/**
 * Creates a player object and returns it immediately
 * @access public
 * @param  {string} id
 * @param  {string} username
 * @param  {string} fragment
 * @return {Player}
 */
export function createPlayer({id, username}): Player {
  return {
    id,
    username,
    // fragment,
    // fullUsername: `${username}#${fragment}`,
    isLeading: false,
    isCzar: false,
    points: 0,
    cards: []
  } as Player;
}

/**
 * Initial state of the player store
 * @access public
 * @const
 * @name initialState
 * @type {Object}
 */
const initialState = {
  ui: {

  }
};

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
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'player' })
export class PlayerStore extends EntityStore<PlayerState, Player> {

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {
    super();
  }

  /**
   * Adds a array of white cards to the players cards array
   * @access public
   * @param  {WhiteCard[]} cards
   * @return {void}
   */
  public addCardsToActivePlayer(cards: WhiteCard[]): void {
    this.updateActive((activePlayer: Player) => {
      return {
        cards: arrayAdd(activePlayer.cards, cards)
      };
    });
  }

  /**
   * Removes a array of card ids from the active players cards array
   * @access public
   * @param  {number[]} ids
   * @return {void}
   */
  public removeCardsFromActivePlayer(ids: number[]): void {
    this.updateActive((activePlayer: Player) => {
      return {
        cards: arrayRemove(activePlayer.cards, ids)
      };
    });
  }
}

