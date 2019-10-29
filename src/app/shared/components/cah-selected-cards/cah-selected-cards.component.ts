import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {WhiteCard} from '@shared/models/white-card.model';
import {GameRoomService} from '@services/game-room.service';
import {GameRoomQuery} from '@store/queries/game-room.query';
import {BlackCard} from '@shared/models/black-card.model';

/**
 * The selected white cards class
 * @access public
 * @class
 * @export
 * @implements OnInit
 * @name CahSelectedCardsComponent
 */
@Component({
  selector: 'cah-selected-cards',
  templateUrl: './cah-selected-cards.component.html',
  styleUrls: ['./cah-selected-cards.component.scss']
})
export class CahSelectedCardsComponent implements OnInit {

  /**
   * The Observable of the currently selected white cards
   * @access   public
   * @property {Observable<WhiteCard[]>} selectedWhiteCards$
   */
  public selectedWhiteCards$: Observable<WhiteCard[]>;

  /**
   * The Observable of the currently selected black card
   * @access   public
   * @property {Observable<BlackCard>} selectedBlackCard$
   */
  public selectedBlackCard$: Observable<BlackCard>;

  /**
   * States if the store is loading
   * @access   public
   * @property {Observable<boolean>} isLoading$
   */
  public isLoading$: Observable<boolean>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(private readonly _gameRoomQuery: GameRoomQuery,
                     private readonly _gameRoomService: GameRoomService) {}

  /**
   * @inheritDoc
   * Callback that gets called when the components gets initialized
   * Subscribe to the selected white and the selected black card
   * @access public
   * @return {void}
   */
  public ngOnInit(): void {
    this.isLoading$          = this._gameRoomQuery.selectLoading();
    this.selectedBlackCard$  = this._gameRoomQuery.selectedBlackCard$;
    this.selectedWhiteCards$ = this._gameRoomQuery.selectedWhiteCards$;
  }
}
