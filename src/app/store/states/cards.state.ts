import {EntityState, MultiActiveState} from '@datorama/akita';
import {Card, CardUI} from '@shared/models/card.model';
import {WhiteCard} from '@shared/models/white-card.model';

/**
 * The CardState interface
 * @access public
 * @export
 * @interface
 * @extends EntityState<Card>, ActiveState
 * @name CardsState
 */
export interface CardsState extends EntityState<WhiteCard>, MultiActiveState {}
export interface CardsUIState extends EntityState<CardUI> {}
