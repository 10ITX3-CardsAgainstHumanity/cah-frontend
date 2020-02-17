import {GameState} from '@store/states/game-room.state';
import {BlackCard} from '@shared/models/black-card.model';
import {WhiteCard} from '@shared/models/white-card.model';
import {Player, PlayerUI} from '@shared/models/player.model';
import {ID} from '@datorama/akita';

export interface ResponseMessage {
  status: boolean;
  msg?: GeneralSettings | SelectedCards[];
}

export interface GeneralSettings {
  state?: GameState;
  card?: Partial<BlackCard>|Partial<WhiteCard>;
  cards?: WhiteCard[];
  player?: (Player & PlayerUI);
  players?: (Player & PlayerUI)[];
}

export interface SelectedCards {
  playerId: ID;
  cards: { id: ID, text: string }[];
}
