import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
   * States if the active user is currently the czar
   * @access    public
   * @property  {Observable<boolean>} isCzar
   * @decorator Input
   */
  @Input()
  public isCzar$: Observable<boolean>;

  /**
   * The currently available cards of the player on his hand
   * @access public
   * @property {Observable<WhiteCard[]>} whiteCards
   * @decorator Input
   */
  @Input()
  public localPlayerCards$: Observable<WhiteCard[]>;

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
   * @inheritDoc
   * @access public
   * @return {void}
   */
  public ngOnInit(): void {}

  /**
   * Callback if a card was selected by the user
   * @access public
   * @param  {WhiteCard} card
   * @param  {number}    index
   * @return {void}
   */
  public onCardSelected(card: WhiteCard, index: number): void {
    this.cardSelected.emit(card)
    console.log(`selected card ${JSON.stringify(card)}`);
    // this._gameRoomService.addSelectedWhiteCard([ card ]);
    // this._gameRoomService.removeCardFromHand(index);
  }
}
