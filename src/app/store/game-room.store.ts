import {Injectable} from '@angular/core';
import {GameRoomState} from '@store/states/game-room.state';
import {arrayAdd, arrayRemove, arrayUpdate, ID, Store, StoreConfig} from '@datorama/akita';
import {WhiteCard} from '@shared/models/white-card.model';
import {BlackCard} from '@shared/models/black-card.model';

/**
 * Creates a player object and returns it immediately
 * @access public
 * @param  {string}      roomId
 * @param  {BlackCard}   blackCard
 * @param  {WhiteCard[]} whiteCards
 * @return {GameRoomState}
 */
export function createInitialState({roomId, blackCard, whiteCards}): GameRoomState {
  return {
    roomId,
    blackCard,
    whiteCards
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
      roomId: null,
      blackCard: null,
      whiteCards: []
    }));
  }

  /**
   * Add a array of white cards to the current white cards
   * and update the state
   * @access public
   * @param  {WhiteCard[]} cards
   * @return {void}
   */
  public addWhiteCards(cards: WhiteCard[]): void {
    this.update((state: GameRoomState) => {
      return <GameRoomState>{
        whiteCards: arrayAdd(state.whiteCards, cards)
      };
    });
  }

  /**
   * Updates a set of white cards to the partial new state
   * @access public
   * @param  {WhiteCard[]}        cards
   * @param  {Partial<WhiteCard>} newState
   * @return {void}
   */
  public updateWhiteCards(cards: WhiteCard[], newState: Partial<WhiteCard>): void {
    const ids = cards.map(card => card.id);

    this.update((state: GameRoomState) => {
      return <GameRoomState>{
        whiteCards: arrayUpdate(state.whiteCards, ids, newState)
      };
    });
  }

  /**
   * Set the selected white cards to a new array of white cards
   * @access public
   * @param  {WhiteCard[]} cards
   * @return {void}
   */
  public setWhiteCards(cards: WhiteCard[]): void {
    this.update((state: GameRoomState) => {
      return <GameRoomState>{
        whiteCards: cards
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
        whiteCards: arrayUpdate(state.whiteCards, ids, newState)
      };
    });
  }

  /**
   * Removes a set of ids from the selected white cards array
   * @access public
   * @param  {ID[]} ids
   * @return {void}
   */
  public removeWhiteCards(ids: ID[]): void {
    this.update((state: GameRoomState) => {
      return <GameRoomState>{
        whiteCards: arrayRemove(state.whiteCards, ids)
      };
    });
  }

  /**
   * Updates the selected black card to the specified
   * @access public
   * @param  {BlackCard} card
   * @return {void}
   */
  public updateBlackCard(card: BlackCard): void {
    this.update((state: GameRoomState) => {
      return <GameRoomState>{
        blackCard: card
      };
    });
  }

  /**
   * Removes the current black card and sets it to null
   * @access public
   * @param  {ID} id
   * @return {void}
   */
  public removeBlackCard(id: ID): void {
    this.update((state: GameRoomState) => {
      return <GameRoomState>{
        blackCard: null
      };
    });
  }

  /**
   * Updates the selected black card
   * @access public
   * @param  {BlackCard} card
   * @return {void}
   */
  public updateSelectedBlackCard(card: BlackCard): void {

  }

  /**
   * Adds selected white cards
   * @access public
   * @param  {WhiteCard[]} whiteCards
   * @return {void}
   */
  public addSelectedWhiteCards(whiteCards: WhiteCard[]): void {

  }
}

