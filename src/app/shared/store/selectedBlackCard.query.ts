import {QueryEntity} from '@datorama/akita';
import {SelectedBlackCardState, SelectedBlackCardStore} from './selectedBlackCard.store';
import {BlackCard} from '../interfaces/black-card';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SelectedBlackCardQuery extends QueryEntity<SelectedBlackCardState, BlackCard> {
  public constructor(protected _store: SelectedBlackCardStore) {
    super(_store);
  }
}
