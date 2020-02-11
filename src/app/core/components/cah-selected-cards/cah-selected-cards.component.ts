import {Component, Input, OnInit} from '@angular/core';
import {WhiteCard} from '@shared/models/white-card.model';
import {BlackCard} from '@shared/models/black-card.model';

/**
 * The selected white cards class
 * @access public
 * @class
 * @export
 * @implements OnInit
 * @name CahSelectedCardsComponent
 */
@Component({
  selector: 'cah-selected-cards',
  template: `
    <div class="cah-selected-cards">
      <div class="cah-selected-black-card">
        <cah-black-card [card]="selectedBlackCard"></cah-black-card>
      </div>
      <div class="cah-selected-white-cards">
        <cah-white-card *ngFor="let card of selectedWhiteCards" [card]="card"></cah-white-card>
      </div>
    </div>
  `,
  styleUrls: ['./cah-selected-cards.component.scss']
})
export class CahSelectedCardsComponent {

  /**
   * The Observable of the currently selected white cards
   * @access   public
   * @property {WhiteCard[]} selectedWhiteCards
   */
  @Input()
  public selectedWhiteCards: WhiteCard[];

  /**
   * The Observable of the currently selected black card
   * @access   public0
   * @property {BlackCard} selectedBlackCard
   */
  @Input()
  public selectedBlackCard: BlackCard;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {}

}
