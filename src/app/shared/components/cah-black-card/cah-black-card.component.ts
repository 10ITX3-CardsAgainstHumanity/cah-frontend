import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {WhiteCard} from '../../interfaces/white-card';
import {BlackCard} from '../../interfaces/black-card';

/**
 * The black card class
 * @access public
 * @class
 * @export
 * @name CahBlackCardComponent
 */
@Component({
  selector: 'cah-black-card',
  templateUrl: './cah-black-card.component.html',
  styleUrls: ['./cah-black-card.component.scss']
})
export class CahBlackCardComponent {

  /**
   * The selected card
   * @access public
   * @property {EventEmitter<WhiteCard>} cardSelected
   */
  @Output()
  public cardSelected: EventEmitter<BlackCard>;

  /**
   * The text of the card
   * @access public
   * @property {BlackCard} card
   */
  @Input()
  public card: BlackCard;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {
    this.cardSelected = new EventEmitter<BlackCard>();
  }

  /**
   * Gets triggered if the card was selected
   * and emits the text of the card
   * @access public
   * @return {void}
   */
  @HostListener('click')
  public onSelected(): void {
    this.cardSelected.emit(
      <BlackCard>{text: this.card.text, playerId: this.card.playerId, maxPlayableWhiteCards: this.card.maxPlayableWhiteCards}
    );
  }
}
