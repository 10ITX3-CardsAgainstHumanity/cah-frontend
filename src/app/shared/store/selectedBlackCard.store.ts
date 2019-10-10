import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {BlackCard} from '../interfaces/black-card';
import {Injectable} from '@angular/core';

export interface SelectedBlackCardState extends EntityState<BlackCard> {
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'selectedBlackCard' })
export class SelectedBlackCardStore extends EntityStore<SelectedBlackCardState, BlackCard> {
  public constructor() {
    super();
  }
}
