import {Component, OnDestroy, OnInit} from '@angular/core';
import {WhiteCard} from '../../interfaces/white-card';
import {BlackCard} from '../../interfaces/black-card';
import {GameRoomService} from '../../service/game-room.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'cah-selected-cards',
  templateUrl: './cah-selected-cards.component.html',
  styleUrls: ['./cah-selected-cards.component.scss']
})
export class CahSelectedCardsComponent implements OnInit, OnDestroy {

  /**
   * The currently selected cards for the black card
   * @access   public
   * @property {WhiteCard[]} selectedWhiteCards
   */
  public selectedWhiteCards: WhiteCard[];

  /**
   * The currently selected black card
   * @access   public
   * @property {BlackCard} selectedBlackCard
   */
  public selectedBlackCard: BlackCard;

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
  public constructor(private _gameRoomService: GameRoomService) {
    this._ngUnSub = new Subject<void>();
    this.selectedWhiteCards = [];
    this.selectedBlackCard = null;
  }

  /**
   * @inheritDoc
   * Callback that gets called when the components gets initialized
   * Subscribe to the selected white and the selected black card
   * @access public
   * @return {void}
   */
  public ngOnInit(): void {
    this._gameRoomService.selectedWhiteCards$
      .pipe(takeUntil(this._ngUnSub))
      .subscribe((cards: WhiteCard[]) => {
        this.selectedWhiteCards = cards;
      });

    this._gameRoomService.selectedBlackCard$
      .pipe(takeUntil(this._ngUnSub))
      .subscribe((card: BlackCard) => {
        this.selectedBlackCard = card;
      });
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
