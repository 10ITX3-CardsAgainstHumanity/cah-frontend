import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {WhiteCard} from '@shared/models/white-card.model';

@Component({
  selector: 'cah-selected-cards',
  templateUrl: './cah-selected-cards.component.html',
  styleUrls: ['./cah-selected-cards.component.scss']
})
export class CahSelectedCardsComponent implements OnInit {

  /**
   * The selected white cards
   * @access   public
   * @property {Observable<WhiteCard[]>} selectedWhiteCards$
   */
  public selectedWhiteCards$: Observable<WhiteCard[]>;

  /**
   * States if the store is loading
   * @access   public
   * @property {Observable<boolean>} isLoading$
   */
  public isLoading$: Observable<boolean>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {}

  /**
   * @inheritDoc
   * Callback that gets called when the components gets initialized
   * Subscribe to the selected white and the selected black card
   * @access public
   * @return {void}
   */
  public ngOnInit(): void {}
}
