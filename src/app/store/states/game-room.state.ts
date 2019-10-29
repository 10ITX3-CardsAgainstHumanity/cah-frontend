import {GameRoom} from '@shared/models/game-room.model';
import {ActiveState, EntityState} from '@datorama/akita';

/**
 * The GameRoomState interface
 * @access public
 * @class
 * @export
 * @extends EntityState<GameRoom>
 * @name GameRoomState
 */
export interface GameRoomState extends EntityState<GameRoom>, ActiveState {}
