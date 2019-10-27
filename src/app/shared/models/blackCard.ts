import {Card} from '@shared/models/card';

/**
 * The BlackCard model
 * @access public
 * @interface
 * @export
 * @name BlackCard
 */
export interface BlackCard extends Card {

  /**
   * The maximum cards thats needed for the substitutions
   * @access   public
   * @property {number} maxPlayableWhiteCards
   */
  maxPlayableWhiteCards: number;
}
