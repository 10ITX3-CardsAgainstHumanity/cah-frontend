import {GameRoom} from '@shared/models/game-room.model';
import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {GameRoomStore} from '../game-room.store';
import {GameRoomState} from '@store/states/game-room.state';
import {Observable} from 'rxjs';
import {WhiteCard} from '@shared/models/white-card.model';
import {BlackCard} from '@shared/models/black-card.model';

/**
 * The GameRoomQuery class
 * @access public
 * @class
 * @export
 * @name GameRoomQuery
 */
@Injectable({ providedIn: 'root' })
export class GameRoomQuery extends QueryEntity<GameRoomState, GameRoom> {

  /**
   * Observable of the room id
   * @access   public
   * @property {Observable<string>} roomId$
   */
  public roomId$: Observable<string>;

  /**
   * Selected white cards observable
   * @access   public
   * @property {Observable<WhiteCard[]>} selectedWhiteCards$
   */
  public selectedWhiteCards$: Observable<WhiteCard[]>;

  /**
   * The selected black card observable
   * @access   public
   * @property {Observable<BlackCard>} selectedBlackCard$
   */
  public selectedBlackCard$: Observable<BlackCard>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(protected store: GameRoomStore) {
    super(store);

    this.roomId$             = this.select('roomId');
    this.selectedBlackCard$  = this.select('selectedBlackCard');
    this.selectedWhiteCards$ = this.select('selectedWhiteCards');
  }
}
