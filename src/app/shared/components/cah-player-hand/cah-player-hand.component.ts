import { Component, OnInit } from '@angular/core';
import {WhiteCard} from '../../interfaces/white-card';
import {GameRoomService} from '../../service/game-room.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

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
export class CahPlayerHandComponent implements OnInit {

  /**
   * The currently available cards of the player on his hand
   * @access public
   * @property {WhiteCard[]} whiteCards
   */
  public whiteCards: WhiteCard[];

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
  }

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    this._gameRoomService.playerCards$
      .pipe(takeUntil(this._ngUnSub))
      .subscribe((cards: WhiteCard[]) => {
        this.whiteCards = cards;
      });
  }

  /**
   * Callback if a card was selected by the user
   * @access public
   * @param  {WhiteCard} $event
   * @param  {number}    index
   * @return {void}
   */
  public onCardSelected($event: WhiteCard, index: number): void {
    this._gameRoomService.addSelectedWhiteCard([ $event ]);
    this._gameRoomService.removeCardFromHand(index);
  }
}
