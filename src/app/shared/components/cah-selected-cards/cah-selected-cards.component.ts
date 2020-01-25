import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
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
  templateUrl: './cah-selected-cards.component.html',
  styleUrls: ['./cah-selected-cards.component.scss']
})
export class CahSelectedCardsComponent {

  /**
   * The Observable of the currently selected white cards
   * @access   public
   * @property {Observable<WhiteCard[]>} selectedWhiteCards$
   */
  @Input()
  public selectedWhiteCards$: Observable<WhiteCard[]>;

  /**
   * The Observable of the currently selected black card
   * @access   public
   * @property {Observable<BlackCard>} selectedBlackCard$
   */
  @Input()
  public selectedBlackCard$: Observable<BlackCard>;

  /**
   * States if the store is loading
   * @access   public
   * @property {Observable<boolean>} isLoading$
   */
  @Input()
  public isLoading$: Observable<boolean>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {}

}
