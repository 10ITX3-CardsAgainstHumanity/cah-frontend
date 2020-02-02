import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {WhiteCard} from '@shared/models/white-card.model';
import {BlackCard} from '@shared/models/black-card.model';

/**
 * The black card class
 * @access public
 * @class
 * @export
 * @name CahBlackCardComponent
 */
@Component({
  selector: 'cah-black-card',
  template: `
    <div class="blackcard">
      <h2 class="blackcard__header">{{ card.text }}</h2>
      <div class="blackcard__caption">
        <p>Cards</p>
        <p>Against</p>
        <p>Humanity</p>
      </div>
      <div class="blackcard__icon">
        <div class="blackcard__icon--full"></div>
        <div class="blackcard__icon--slanted"></div>
      </div>
    </div>
  `,
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
