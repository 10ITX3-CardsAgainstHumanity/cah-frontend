/**
 * The player model interface
 * @access public
 * @extends
 * @interface
 * @name Player
 */
import {WhiteCard} from '@shared/models/whiteCard';

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
   * The fragment of the user to avoid collisions
   * with the same name
   * @access public
   * @property {string} fragment
   */
  fragment: string;

  /**
   * The full username (<username>#<fragment>)
   * @access   public
   * @property {string} fullUsername
   */
  fullUsername?: string;

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
