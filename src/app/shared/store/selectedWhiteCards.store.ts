import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {WhiteCard} from '../interfaces/white-card';
import {Injectable} from '@angular/core';

export interface SelectedWhiteCardsState extends EntityState<WhiteCard> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'selectedWhiteCards' })
export class SelectedWhiteCardsStore extends EntityStore<SelectedWhiteCardsState, WhiteCard> {
  public constructor() {
    super();
  }
}
