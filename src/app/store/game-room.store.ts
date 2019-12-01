import {Injectable} from '@angular/core';
import {GameRoomState} from '@store/states/game-room.state';
import {arrayAdd, arrayRemove, arrayUpdate, ID, Store, StoreConfig} from '@datorama/akita';
import {WhiteCard} from '@shared/models/white-card.model';
import {BlackCard} from '@shared/models/black-card.model';

/**
 * Creates a player object and returns it immediately
 * @access public
 * @param  {string}      roomId
 * @param  {BlackCard}   selectedBlackCard
 * @param  {WhiteCard[]} selectedWhiteCards
 * @return {GameRoomState}
 */
export function createInitialState({roomId, selectedBlackCard, selectedWhiteCards}): GameRoomState {
  return {
    roomId,
    selectedBlackCard,
    selectedWhiteCards
  } as GameRoomState;
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
export class GameRoomStore extends Store<GameRoomState> {

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {
    super(createInitialState({
      roomId: 'dasfsdf',
      selectedBlackCard: <BlackCard>{ id: 'f', maxPlayableWhiteCards: 1, text: '____', playerId: '1' },
      selectedWhiteCards: []
    }));
  }

  /**
   * Add a array of white cards to the current white cards
   * and update the state
   * @access public
   * @param  {WhiteCard[]} cards
   * @return {void}
   */
  public addSelectedWhiteCards(cards: WhiteCard[]): void {
    this.update((state: GameRoomState) => {
      return <GameRoomState>{
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
    this.update((state: GameRoomState) => {
      return <GameRoomState>{
        selectedWhiteCards: cards
      };
    });
  }

  /**
   * Updates a set of white cards on the store
   * @access public
   * @param  {WhiteCard[]} cards
   * @param  {Partial<WhiteCard>} newState
   * @return {void}
   */
  public updateSelectedWhiteCards(cards: WhiteCard[], newState: Partial<WhiteCard>): void {
    const ids = cards.map(card => card.id);

    this.update((state: GameRoomState) => {
      return <GameRoomState>{
        selectedWhiteCards: arrayUpdate(state.selectedWhiteCards, ids, newState)
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
    this.update((state: GameRoomState) => {
      return <GameRoomState>{
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
  public updateSelectedBlackCard(card: BlackCard): void {
    this.update((state: GameRoomState) => {
      return <GameRoomState>{
        selectedBlackCard: card
      };
    });
  }

  /**
   * Removes the current black card and sets it to null
   * @access public
   * @param  {ID} id
   * @return {void}
   */
  public removeSelectedBlackCard(id: ID): void {
    this.update((state: GameRoomState) => {
      return <GameRoomState>{
        selectedBlackCard: null
      };
    });
  }
}

