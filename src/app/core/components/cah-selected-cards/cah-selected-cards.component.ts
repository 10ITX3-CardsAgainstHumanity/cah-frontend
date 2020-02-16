import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WhiteCard} from '@shared/models/white-card.model';
import {BlackCard} from '@shared/models/black-card.model';
import {Observable} from 'rxjs';
import {GameState} from '@store/states/game-room.state';
import {Player, PlayerUI} from '@shared/models/player.model';
import {SelectedCards} from '@interfaces/responseMessage';
import {ID} from '@datorama/akita';

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
   * The GameState enum
   * @access   public
   * @property {GameState} enum_GameState
   */
  public enum_GameState: typeof GameState;

  /**
   * States the number of needed answers the user needs to fill out his place
   * @access   public
   * @property {number} neededAnswers
   */
  @Input()
  public neededAnswers: number;

  /**
   * States the currently playing players in this room
   * @access   public
   * @property {Player[]} players
   */
  @Input()
  public players: (Player & PlayerUI)[];

  /**
   * States the current game state
   * @access   public
   * @property {GameState} gameState
   */
  @Input()
  public gameState: GameState;

  @Input()
  public localPlayer: (Player & PlayerUI);

  /**
   * The currently selected active cards
   * @access   public
   * @property {WhiteCard[]} localActiveCards
   */
  @Input()
  public localActiveCards: WhiteCard[];

  /**
   * The Observable of the currently selected white cards
   * @access   public
   * @property {Observable<SelectedCards>} selectedWhiteCards$
   */
  @Input()
  public selectedWhiteCards$: Observable<SelectedCards[]>;

  /**
   * The Observable of the currently selected black card
   * @access   public0
   * @property {Observable<BlackCard>} selectedBlackCard$
   */
  @Input()
  public selectedBlackCard$: Observable<BlackCard>;

  /**
   * Emits the selected active card
   * @access   public
   * @property {EventEmitter<WhiteCard>} cardSelected
   */
  @Output()
  public cardSelected: EventEmitter<WhiteCard>;

  @Output()
  public cardGroupSelected: EventEmitter<{ cards: WhiteCard[], playerId: ID }>;


  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {
    this.neededAnswers = 0;
    this.players = null;
    this.localPlayer = null;
    this.gameState = null;
    this.players   = [];
    this.enum_GameState = GameState;
    this.localActiveCards = null;
    this.selectedWhiteCards$ = null;
    this.selectedBlackCard$  = null;
    this.cardSelected = new EventEmitter<WhiteCard>();
    this.cardGroupSelected = new EventEmitter<{cards: WhiteCard[], playerId: ID}>();
  }

  /**
   * Emits the selected card
   * @access public
   * @param  {WhiteCard} card
   * @param  {ID}        playerId
   * @return {void}
   */
  public onCardSelected(card: WhiteCard): void {
    this.cardSelected.emit(card);
  }

  /**
   * Emits the selected card group
   * @access public
   * @return {}
   */
  public onCardGroupSelected(cardGroup: SelectedCards) {
    this.cardGroupSelected.emit(cardGroup);
  }
}
