/**
 * The base Card model interface
 * @access public
 * @export
 * @interface
 * @name Card
 */
import {ID} from '@datorama/akita';

export interface Card {

  /**
   * The id of the card
   * @access   public
   * @property {ID} id
   */
  id: ID;

  /**
   * The text on the card itself
   * @access   public
   * @property {string} text
   */
  text: string;

  /**
   * States if the card is a dummy card,
   * therefor it only displays CAH and nothing more
   */
  dummy?: boolean;
}

export interface CardUI {

  /**
   * States if the card was selected for the selection process but not yet confirmed to be it
   * @access   public
   * @property {boolean} selected
   */
  selected: boolean;
}
