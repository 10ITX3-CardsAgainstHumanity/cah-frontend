import {Injectable} from '@angular/core';
import {EntityStore, StoreConfig} from '@datorama/akita';
import {CardsState} from '@store/states/cards.state';
import {WhiteCard} from '@shared/models/white-card.model';

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'cards'})
export class CardsStore extends EntityStore<CardsState, WhiteCard> {

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {
    super({ active: [] });
    this.createUIStore().setInitialEntityState({ selected: false });
  }
}

