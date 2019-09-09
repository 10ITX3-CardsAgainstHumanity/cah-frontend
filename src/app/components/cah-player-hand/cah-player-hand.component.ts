import { Component, OnInit } from '@angular/core';
import {WhiteCard} from '../../interfaces/white-card';
import {GameRoomService} from '../../service/game-room.service';

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
   * @property {WhiteCard[]} whiteCards
   */
  public whiteCards: WhiteCard[];

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(private readonly _gameRoomService: GameRoomService) {
    this.whiteCards = <WhiteCard[]>[
      {
        text: 'Ein gebleichtes Arschloch'
      },
      {
        text: 'Ein Mikropenis'
      },
      {
        text: 'Ein Hirntumor'
      },
      {
        text: 'Meine Genitalien'
      },
      {
        text: 'Resteficken'
      },
      {
        text: 'Postnatale Abtreibung'
      },
      {
        text: 'Gruppensex in der Demenzklinik',
      },
      {
        text: 'Deiner Partnerin einen Dreier mit ihrer Muttervorschlagen'
      },
      {
        text: 'Ein epileptischer Anfall bei der Bombenentschärfung'
      },
      {
        text: 'Verschwörungstheorien'
      }
    ];
  }

  /**
   * Callback if a card was selected by the user
   * @access public
   * @param  {WhiteCard} $event
   * @param  {number}    index
   * @return {void}
   */
  public onCardSelected($event: WhiteCard, index: number): void {
    console.log($event, index);
    this._gameRoomService.addSelectedWhiteCard([ $event ]);
    // remove clicked card from hand
  }
}
