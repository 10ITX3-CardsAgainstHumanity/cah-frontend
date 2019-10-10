import {Component, OnDestroy, OnInit} from '@angular/core';
import {WhiteCard} from '../../interfaces/white-card';
import {BlackCard} from '../../interfaces/black-card';
import {GameRoomService} from '../../service/game-room.service';
import {Observable, Subject} from 'rxjs';
import {SelectedBlackCardQuery} from '../../store/selectedBlackCard.query';
import {SelectedWhiteCardsQuery} from '../../store/selectedWhiteCards.query';

@Component({
  selector: 'cah-selected-cards',
  templateUrl: './cah-selected-cards.component.html',
  styleUrls: ['./cah-selected-cards.component.scss']
})
export class CahSelectedCardsComponent implements OnInit, OnDestroy {

  /**
   * The currently selected cards for the black card
   * @access   public
   * @property {Observable<WhiteCard[]>} $selectedWhiteCards
   */
  public $selectedWhiteCards: Observable<WhiteCard[]>;

  /**
   * States if the white cards are still loading
   * @access   public
   * @property {Observable<WhiteCard[]>} $selectedWhiteCardsLoading
   */
  public $selectedWhiteCardsLoading: Observable<boolean>;

  /**
   * The currently selected black card
   * @access   public
   * @property {Observable<BlackCard>} $selectedBlackCard
   */
  public $selectedBlackCard: Observable<BlackCard>;

  /**
   * States if the black card is still loading
   * @access   public
   * @property {Observable<boolean>} $selectedBlackCardLoading
   */
  public $selectedBlackCardLoading: Observable<boolean>;

  /**
   * Unsubscribe from every open subject in this component
   * @access   private
   * @property {Subject<void>} _ngUnSub
   */
  private _ngUnSub: Subject<void>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(private readonly _selectedWhiteCardsQuery: SelectedWhiteCardsQuery,
                     private readonly _selectedBlackCardQuery: SelectedBlackCardQuery,
                     private readonly _gameRoomService: GameRoomService) {
    this._ngUnSub = new Subject<void>();
    this.$selectedBlackCard = null;
    this.$selectedWhiteCards = null;
  }

  /**
   * @inheritDoc
   * Callback that gets called when the components gets initialized
   * Subscribe to the selected white and the selected black card
   * @access public
   * @return {void}
   */
  public ngOnInit(): void {
    this.$selectedWhiteCards = this._selectedWhiteCardsQuery.selectAll();
    this.$selectedWhiteCardsLoading = this._selectedWhiteCardsQuery.selectLoading();

    this.$selectedBlackCard = this._selectedBlackCardQuery.selectFirst();
    this.$selectedBlackCardLoading = this._selectedBlackCardQuery.selectLoading();
  }

  /**
   * Callback that gets called when the components gets destroyed
   * @access public
   * @return {void}
   */
  public ngOnDestroy(): void {
    this._ngUnSub.next();
    this._ngUnSub.complete();
  }
}
