import {EntityState} from '@datorama/akita';
import {BlackCard} from '@shared/models/black-card.model';
import {SelectedCards} from '@interfaces/responseMessage';

export enum GameState {
  UNSTARTED,
  START,
  SELECTION,
  JUDGING
}

/**
 * The GameRoomState interface
 * @access public
 * @class
 * @export
 * @extends EntityState<GameRoomState>
 * @name GameRoomState
 */
export interface GameRoomState {

  /**
   * The room id
   * @access   public
   * @property {string} roomId
   */
  roomId: string;

  /**
   * The selected black card
   * @access   public
   * @property {BlackCard} blackCard
   */
  blackCard: BlackCard;

  /**
   * The selected white cards with the corresponding player id
   * @access   public
   * @property {SelectedCards[]} whiteCards
   */
  whiteCards: SelectedCards[];

  /**
   * The czar selected group to send back to the server
   * @access public
   * @property {SelectedCards} selectedCardGroup
   */
  selectedCardGroup: SelectedCards;

  /**
   * The current state of the game room
   * @access   public
   * @property {GameState} state
   */
  state: GameState;
}
