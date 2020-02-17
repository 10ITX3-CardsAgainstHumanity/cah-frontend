import {Injectable} from '@angular/core';
import {EntityUIQuery, QueryConfig, QueryEntity} from '@datorama/akita';
import {combineLatest, Observable} from 'rxjs';
import {WhiteCard} from '@shared/models/white-card.model';
import {CardsState, CardsUIState} from '@store/states/cards.state';
import {CardsStore} from '@store/cards.store';
import {Card, CardUI} from '@shared/models/card.model';
import {map} from 'rxjs/operators';

/**
 * The CardsQuery class
 * @access public
 * @class
 * @export
 * @extends QueryEntity<PlayerState, Player>
 * @name CardsQuery
 */
@Injectable({providedIn: 'root'})
@QueryConfig({})
export class CardsQuery extends QueryEntity<CardsState, WhiteCard> {

  public ui: EntityUIQuery<CardsUIState>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(protected readonly _store: CardsStore) {
    super(_store);
    this.createUIQuery();
  }

  /**
   * Selects all cards with the ui
   * @access public
   * @return {Observable<(Card & CardUI)>}
   */
  public selectAllWithUI(): Observable<(Card & CardUI)[]> {
    const cards$ = this.selectAll();
    const cardsUI$ = this.ui.selectAll({ asObject: true });

    return combineLatest(
      cards$,
      cardsUI$
    ).pipe(
      map(([ cards, cardsUI ]) => {
        return cards.map(card => {
          return {
            ...card,
            ...cardsUI[card.id]
          };
        });
      })
    );
  }

  public selectAllWithoutActive(): Observable<(Card & CardUI)[]> {
    const cards$         = this.selectAll();
    const cardsUI$       = this.ui.selectAll({ asObject: true });
    const activeCardIDs$ = this.selectActiveId();

    return combineLatest(
      cards$,
      cardsUI$,
      activeCardIDs$
    ).pipe(
      map(([ cards, cardsUI, activeCardIDs ]) => {
        return cards.filter((card) => !activeCardIDs.includes(card.id)).map(card => {
          return {
            ...card,
            ...cardsUI[card.id]
          };
        });
      })
    );
  }
}
