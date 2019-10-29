import {GameRoom} from '@shared/models/game-room.model';
import {Injectable} from '@angular/core';
import {GameRoomState} from '@store/states/game-room.state';
import {arrayAdd, arrayRemove, arrayUpdate, EntityStore, ID, StoreConfig} from '@datorama/akita';
import {Player} from '@shared/models/player.model';
import {WhiteCard} from '@shared/models/white-card.model';
import {BlackCard} from '@shared/models/black-card.model';

/**
 * Creates a player object and returns it immediately
 * @access public
 * @param  {string} id
 * @param  {string} username
 * @param  {string} fragment
 * @return {Player}
 */
export function createGameState({roomId, selectedBlackCard, selectedWhiteCards}): GameRoom {
  return {
    roomId,
    selectedBlackCard,
    selectedWhiteCards
  } as GameRoom;
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
 * The GameRoomStore class
 * @access public
 * @class
 * @export
 * @extends EntityStore<GameRoomState, GameRoom>
 * @name GameRoomStore
 */
@Injectable({  providedIn: 'root' })
@StoreConfig({ name: 'game-room'  })
export class GameRoomStore extends EntityStore<GameRoomState, GameRoom> {

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {
    super();
  }

  /**
   * Add a array of white cards to the current white cards
   * and update the state
   * @access public
   * @param  {WhiteCard[]} cards
   * @return {void}
   */
  public addSelectedWhiteCards(cards: WhiteCard[]): void {
    this.updateActive((state: GameRoom) => {
      return <GameRoom>{
        selectedWhiteCards: arrayAdd(state.selectedWhiteCards, cards)
      };
    });
  }

  /**
   * Set the selected white cards to a new array of white cards
   * @access public
   * @param  {WhiteCard[]} cards
   * @return {void}
   */
  public setSelectedWhiteCards(cards: WhiteCard[]): void {
    this.updateActive((state: GameRoom) => {
      return <GameRoom>{
        selectedWhiteCards: cards
      };
    });
  }

  /**
   * Removes a set of ids from the selected white cards array
   * @access public
   * @param  {ID[]} ids
   * @return {void}
   */
  public removeSelectedWhiteCards(ids: ID[]): void {
    this.updateActive((state: GameRoom) => {
      return <GameRoom>{
        selectedWhiteCards: arrayRemove(state.selectedWhiteCards, ids)
      };
    });
  }

  /**
   * Updates the selected black card to the specified
   * @access public
   * @param  {ID}        id
   * @param  {BlackCard} card
   * @return {void}
   */
  public updateSelectedBlackCard(id: ID, card: BlackCard): void {
    this.updateActive((state: GameRoom) => {
      return <GameRoom>{
        selectedBlackCard: arrayUpdate(state.selectedBlackCard, id, card)
      };
    });
  }
}

