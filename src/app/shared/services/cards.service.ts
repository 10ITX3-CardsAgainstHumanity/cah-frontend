import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {WhiteCard} from '@shared/models/white-card.model';
import {CardsStore} from '@store/cards.store';
import {arrayRemove, ID} from '@datorama/akita';

/**
 * The CardsService class
 * @access public
 * @class
 * @export
 * @implements OnInit
 * @name CardsService
 */
@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private _maxActiveCards: number;

  private _selectedActiveCards: WhiteCard[];

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(private readonly _socket: Socket,
                     private readonly _cardStore: CardsStore) {
    this._maxActiveCards = 0;
    this._selectedActiveCards = [];
  }

  /**
   * Requests the cards from the server
   * @access public
   * @return {void}
   */
  public requestCards(): void {
    this._socket.emit('player.cards');
  }

  /**
   * Upserts a card into the players hand
   * @access public
   * @param  {WhiteCard[]|WhiteCard} cards
   * @return {void}
   */
  public upsertCards(cards: WhiteCard[] | WhiteCard): void {
    this._cardStore.upsertMany(Array.isArray(cards) ? cards : [ cards ]);
  }

  /**
   * Removes one or more cards from the store
   * @access public
   * @param  {ID[]} cardIds
   * @return {void}
   */
  public removeCards(cardIds: ID[]): void {
    this._cardStore.remove(cardIds);
  }

  public toggleActive(card: WhiteCard): void {
    console.log(this._selectedActiveCards);
    if (this._selectedActiveCards.length >= this._maxActiveCards) {
      const shiftedCard: WhiteCard = this._selectedActiveCards.shift();
      this._cardStore.toggleActive(shiftedCard.id);

      if (!this._selectedActiveCards.includes(card)) {
        this._selectedActiveCards.push(card);
        this._cardStore.toggleActive(card.id);
      } else {
        this._cardStore.toggleActive(card.id);
      }
    } else {
      if (this._selectedActiveCards.includes(card)) {
        this._selectedActiveCards = arrayRemove(this._selectedActiveCards, card.id);
        this._cardStore.toggleActive(card.id);
      } else {
        this._selectedActiveCards.push(card);
        this._cardStore.toggleActive(card.id);
      }
    }
  }

  public set maxActiveCards(value: number) {
    if (this._maxActiveCards !== value) {
      this._maxActiveCards = value;
    }
  }
}
