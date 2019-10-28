import {BlackCard} from '@shared/models/black-card.model';
import {WhiteCard} from '@shared/models/white-card.model';

/**
 * The GameRoom Model
 * @access public
 * @export
 * @interface
 * @name GameRoom
 */
export interface GameRoom {

  /**
   * The room id
   * @access   public
   * @property {string} roomId
   */
  roomId: string;

  /**
   * The selected black card
   * @access   public
   * @property {BlackCard} selectedBlackCard
   */
  selectedBlackCard: BlackCard;

  /**
   * The selected white cards
   * @access   public
   * @property {WhiteCard[]} selectedWhiteCards
   */
  selectedWhiteCards: WhiteCard[];
}