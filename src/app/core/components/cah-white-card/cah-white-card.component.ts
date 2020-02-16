import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {WhiteCard} from '@shared/models/white-card.model';

/**
 * The white card class
 * @access public
 * @class
 * @export
 * @name CahWhiteCardComponent
 */
@Component({
  selector: 'cah-white-card',
  template: `
    <div class="whitecard">
      <div class="whitecard__front" *ngIf="!dummy">
        <h2 class="whitecard__header">{{ card.text }}</h2>
        <div class="whitecard__caption--front">
          <p>Cards</p>
          <p>Against</p>
          <p>Humanity</p>
        </div>
        <div class="whitecard__icon">
          <div class="whitecard__icon--full"></div>
          <div class="whitecard__icon--slanted"></div>
        </div>
      </div>
      <div class="whitecard__back" *ngIf="dummy">
        <div class="whitecard__caption--back">
          <p>Cards</p>
          <p>Against</p>
          <p>Humanity</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./cah-white-card.component.scss']
})
export class CahWhiteCardComponent {

  /**
   * The selected card
   * @access   public
   * @property {EventEmitter<WhiteCard>} cardSelected
   */
  @Output()
  public cardSelected: EventEmitter<WhiteCard>;

  /**
   * The text of the card
   * @access   public
   * @property {WhiteCard} card
   */
  @Input()
  public card: WhiteCard;

  /**
   * States if the card was selected
   * @access   public
   * @property {boolean} selected
   */
  @Input()
  public selected: boolean;

  /**
   * States if the card is a dummy
   * @access   public
   * @property {boolean} dummy
   */
  @Input()
  public dummy: boolean;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {
    this.dummy        = true;
    this.selected     = false;
    this.cardSelected = new EventEmitter<WhiteCard>();
  }

  /**
   * Gets triggered if the card was selected
   * and emits the text of the card
   * @access public
   * @return {void}
   */
  @HostListener('click', ['$event'])
  public onSelected($event: Event): void {
    console.log('selected card with id: ', this.card.id)
    this.cardSelected.emit({ id: this.card.id, text: this.card.text });
  }
}
