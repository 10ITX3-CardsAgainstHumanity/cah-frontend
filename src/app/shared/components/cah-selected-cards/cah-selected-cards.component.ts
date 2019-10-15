import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameRoomService} from '../../service/game-room.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'cah-selected-cards',
  templateUrl: './cah-selected-cards.component.html',
  styleUrls: ['./cah-selected-cards.component.scss']
})
export class CahSelectedCardsComponent implements OnInit, OnDestroy {

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
  public constructor(private readonly _gameRoomService: GameRoomService) {
    this._ngUnSub = new Subject<void>();
  }

  /**
   * @inheritDoc
   * Callback that gets called when the components gets initialized
   * Subscribe to the selected white and the selected black card
   * @access public
   * @return {void}
   */
  public ngOnInit(): void {
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
