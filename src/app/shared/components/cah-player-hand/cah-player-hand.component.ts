import {Component, OnInit} from '@angular/core';
import {WhiteCard} from '../../interfaces/white-card';
import {GameRoomService} from '../../service/game-room.service';
import {Observable, Subject} from 'rxjs';

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
   * The currently available cards of the player on his hand
   * @access public
   * @property {Observable<WhiteCard[]>} whiteCards
   */
  public whiteCards$: Observable<WhiteCard[]>;

  /**
   * Unsubscribe from every open subscription
   * @access   private
   * @property {Subject<void>} _ngUnSub
   */
  private _ngUnSub: Subject<void>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(private readonly _gameRoomService: GameRoomService) {
    this._ngUnSub = new Subject<void>();
    this.whiteCards$ = this._gameRoomService.playerCards$;
  }

  /**
   * Callback if a card was selected by the user
   * @access public
   * @param  {WhiteCard} card
   * @param  {number}    index
   * @return {void}
   */
  public onCardSelected(card: WhiteCard, index: number): void {
    this._gameRoomService.addSelectedWhiteCard([ card ]);
    this._gameRoomService.removeCardFromHand(index);
  }
}
