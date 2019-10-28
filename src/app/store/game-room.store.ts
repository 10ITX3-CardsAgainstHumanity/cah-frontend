import {GameRoom} from '@shared/models/game-room.model';
import {Injectable} from '@angular/core';
import {GameRoomState} from '@store/states/game-room.state';
import {EntityStore, StoreConfig} from '@datorama/akita';
import {Player} from '@shared/models/player.model';

/**
 * Creates a player object and returns it immediately
 * @access public
 * @param  {string} id
 * @param  {string} username
 * @param  {string} fragment
 * @return {Player}
 */
export function createGameState({roomId, selectedBlackCard, selectedWhiteCards}): GameRoom {
  return {
    roomId,
    selectedBlackCard,
    selectedWhiteCards
  } as GameRoom;
}

/**
 * Initial state of the player store
 * @access public
 * @const
 * @name initialState
 * @type {Object}
 */
const initialState = {
  ui: {

  }
};

/**
 * The GameRoomStore class
 * @access public
 * @class
 * @export
 * @extends EntityStore<GameRoomState, GameRoom>
 * @name GameRoomStore
 */
@Injectable({  providedIn: 'root' })
@StoreConfig({ name: 'game-room'  })
export class GameRoomStore extends EntityStore<GameRoomState, GameRoom> {

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {
    super();
  }
}

