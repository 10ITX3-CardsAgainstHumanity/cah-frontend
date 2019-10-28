import {Component, OnInit} from '@angular/core';
import {WhiteCard} from '../../models/white-card.model';
import {Observable} from 'rxjs';
import {PlayerQuery} from '@store/queries/player.query';
import {PlayerService} from '@services/player.service';

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
   * @property {Observable<WhiteCard[]>} whiteCards
   */
  public localPlayerCards$: Observable<WhiteCard[]>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(private readonly _playerQuery: PlayerQuery,
                     private readonly _playerService: PlayerService) {
    this.localPlayerCards$ = this._playerQuery.localPlayerCards$;
  }

  /**
   * @inheritDoc
   * @access public
   * @return {void}
   */
  public ngOnInit(): void {
    this._playerService.updatePlayerCards([
      <WhiteCard>{ text: 'dasdas' },
      <WhiteCard>{ text: 'dasdas1' },
      <WhiteCard>{ text: 'dasdas2' },
      <WhiteCard>{ text: 'dasdas3' }
    ]);
  }

  /**
   * Callback if a card was selected by the user
   * @access public
   * @param  {WhiteCard} card
   * @param  {number}    index
   * @return {void}
   */
  public onCardSelected(card: WhiteCard, index: number): void {
    console.log(`selected card ${JSON.stringify(card)}`);
    // this._gameRoomService.addSelectedWhiteCard([ card ]);
    // this._gameRoomService.removeCardFromHand(index);
  }
}
