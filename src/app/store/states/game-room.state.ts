import {EntityState} from '@datorama/akita';
import {BlackCard} from '@shared/models/black-card.model';
import {WhiteCard} from '@shared/models/white-card.model';

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
   * The selected white cards
   * @access   public
   * @property {WhiteCard[]} whiteCards
   */
  whiteCards: WhiteCard[];
}
