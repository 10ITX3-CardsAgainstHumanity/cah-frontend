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
  score: number;
}

/**
 * Describes the Player UI state
 * @access public
 * @interface
 * @export
 * @name PlayerUI
 */
export interface PlayerUI {

  /**
   * States if the user currently leading
   * @access   public
   * @property {boolean} isLeading
   */
  isLeading: boolean;

  /**
   * States if the user is the czar
   * @access   public
   * @property {boolean} isCzar
   */
  isCzar: boolean;

  /**
   * States if the user is the host
   * @access   public
   * @property {boolean} isHost
   */
  isHost: boolean;

  /**
   * States if the players deck is filled with to 10 white cards
   * @access   public
   * @property {boolean} isDeckFilled
   */
  isDeckFilled: boolean;
}
