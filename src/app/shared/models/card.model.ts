/**
 * The base Card model interface
 * @access public
 * @export
 * @interface
 * @name Card
 */
export interface Card {

  /**
   * The id of the card
   * @access   public
   * @property {string} id
   */
  id: string;

  /**
   * The id of the player possessing this card
   * @access   public
   * @property {string} playerId
   */
  playerId: string;

  /**
   * The text on the card itself
   * @access   public
   * @property {string} text
   */
  text: string;
}
