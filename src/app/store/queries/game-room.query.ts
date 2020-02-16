import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {GameRoomStore} from '../game-room.store';
import {GameRoomState, GameState} from '@store/states/game-room.state';
import {Observable} from 'rxjs';
import {WhiteCard} from '@shared/models/white-card.model';
import {BlackCard} from '@shared/models/black-card.model';
import {SelectedCards} from '@interfaces/responseMessage';

/**
 * The GameRoomQuery class
 * @access public
 * @class
 * @export
 * @name GameRoomQuery
 */
@Injectable({providedIn: 'root'})
export class GameRoomQuery extends Query<GameRoomState> {

  /**
   * Selected white cards observable
   * @access   public
   * @property {Observable<WhiteCard[]>} selectedWhiteCards$
   */
  public selectedWhiteCards$: Observable<SelectedCards[]> = this.select('whiteCards');

  /**
   * The selected black card observable
   * @access   public
   * @property {Observable<BlackCard>} selectedBlackCard$
   */
  public selectedBlackCard$: Observable<BlackCard> = this.select('blackCard');

  /**
   * The current state of the game room
   * @access   public
   * @property {Observable<GameState>} selectGameState$
   */
  public selectGameState$: Observable<GameState> = this.select('state');

  /**
   * The currently selected card group
   * @access   public
   * @property {Observable<SelectedCards>} selectedCardGroup$
   */
  public selectedCardGroup$: Observable<SelectedCards> = this.select('selectedCardGroup');

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(protected readonly store: GameRoomStore) {
    super(store);
  }
}
