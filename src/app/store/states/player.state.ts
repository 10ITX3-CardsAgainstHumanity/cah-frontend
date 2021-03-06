import {ActiveState, EntityState} from '@datorama/akita';
import {Player, PlayerUI} from '@shared/models/player.model';

/**
 * The PlayerState interface
 * @access public
 * @export
 * @interface
 * @extends EntityState<Player>, ActiveState
 * @name PlayerState
 */
export interface PlayerState extends EntityState<Player>, ActiveState {}
export interface PlayerUIState extends EntityState<PlayerUI> {}
