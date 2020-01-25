import {WhiteCard} from '@shared/models/white-card.model';

/**
 * The player model
 * @access public
 * @interface
 * @export
 * @name Player
 */
export interface Player {

  /**
   * The id of the player
   * @access public
   * @property {string} id
   */
  id: string;

  /**
   * The username of the player
   * @access   public
   * @property {string} username
   */
  username: string;

  /**
   * The score of the user that he currently has
   * @access   public
   * @property {number} points
   */
  points: number;

  /**
   * States if the user currently leading
   * @access   public
   * @property {boolean} [isLeading]
   */
  isLeading?: boolean;

  /**
   * States if the user is the czar
   * @access   public
   * @property {boolean} isCzar
   */
  isCzar: boolean;

  /**
   * The cards that the user has
   * @access   public
   * @property {WhiteCard[]} cards
   */
  cards: WhiteCard[];
}
