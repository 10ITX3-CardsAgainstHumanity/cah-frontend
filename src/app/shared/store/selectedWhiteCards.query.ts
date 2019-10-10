import {QueryEntity} from '@datorama/akita';
import {SelectedWhiteCardsState, SelectedWhiteCardsStore} from './selectedWhiteCards.store';
import {WhiteCard} from '../interfaces/white-card';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SelectedWhiteCardsQuery extends QueryEntity<SelectedWhiteCardsState, WhiteCard> {
  public constructor(protected _store: SelectedWhiteCardsStore) {
    super(_store);
  }
}
