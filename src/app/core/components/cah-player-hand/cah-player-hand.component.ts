import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WhiteCard} from '@shared/models/white-card.model';
import {PlayerQuery} from '@store/queries/player.query';
import {PlayerService} from '@services/player.service';
import {Card, CardUI} from '@shared/models/card.model';

/**
 * The players card hand
 * @access public
 * @class
 * @export
 * @implements OnInit
 * @name CahPlayerHandComponent
 */
@Component({
  selector: 'cah-player-hand',
  templateUrl: './cah-player-hand.component.html',
  styleUrls: ['./cah-player-hand.component.scss']
})
export class CahPlayerHandComponent {

  /**
   * States if the active user is currently the czar
   * @access    public
   * @property  {boolean} isCzar
   * @decorator Input
   */
  @Input()
  public isCzar: boolean;

  /**
   * The currently available cards of the player on his hand
   * @access public
   * @property {(Card & CardUI)[]} whiteCards
   * @decorator Input
   */
  @Input()
  public localPlayerCards: (Card & CardUI)[];

  @Input()
  public selectedCards: WhiteCard[];

  /**
   * Emits the selected white card to the parent component
   * @access    public
   * @property  {EventEmitter<WhiteCard>} cardSelected
   * @decorator Output
   */
  @Output()
  public cardSelected: EventEmitter<WhiteCard>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(private readonly _playerQuery: PlayerQuery,
                     private readonly _playerService: PlayerService) {
    this.cardSelected = new EventEmitter<WhiteCard>();
  }

  /**
   * Callback if a card was selected by the user
   * @access public
   * @param  {WhiteCard} card
   * @param  {number}    index
   * @return {void}
   */
  public onCardSelected(card: WhiteCard): void {
    this.cardSelected.emit(card);
  }
}
