import {Injectable} from '@angular/core';
import {GameRoomState, GameState} from '@store/states/game-room.state';
import {Store, StoreConfig} from '@datorama/akita';
import {WhiteCard} from '@shared/models/white-card.model';
import {BlackCard} from '@shared/models/black-card.model';
import {SelectedCards} from '@interfaces/responseMessage';

/**
 * Initial state of the player store
 * @access public
 * @const
 * @name initialState
 * @type {Object}
 */
const initialState: GameRoomState = {
  roomId: null,
  blackCard: null,
  whiteCards: [],
  selectedCardGroup: null,
  state: GameState.UNSTARTED
};

/**
 * The GameRoomStore class
 * @access public
 * @class
 * @export
 * @extends EntityStore<GameRoomState, GameRoom>
 * @name GameRoomStore
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'game-room', resettable: true })
export class GameRoomStore extends Store<GameRoomState> {

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {
    super(initialState);
  }

  /**
   * Set the selected white cards to a new array of white cards
   * @access public
   * @param  {WhiteCard[]} cards
   * @return {void}
   */
  public setWhiteCards(cards: SelectedCards[]): void {
    this.update((state: GameRoomState) => {
      return {
        ...state,
        whiteCards: cards
      } as GameRoomState;
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
      return {
        ...state,
        blackCard: card
      } as GameRoomState;
    });
  }

  /**
   * Updates the Game state to a new state
   * @access public
   * @param  {GameState} newState
   * @return {void}
   */
  public updateGameState(newState: GameState): void {
    this.update((state: GameRoomState) => {
      return {
        ...state,
        state: newState
      };
    });
  }
}

