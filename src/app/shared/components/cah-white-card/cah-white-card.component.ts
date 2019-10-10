import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {WhiteCard} from '../../interfaces/white-card';
import {of} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';

/**
 * The white card class
 * @access public
 * @class
 * @export
 * @name CahWhiteCardComponent
 */
@Component({
  selector: 'cah-white-card',
  templateUrl: './cah-white-card.component.html',
  styleUrls: ['./cah-white-card.component.scss']
})
export class CahWhiteCardComponent {

  /**
   * The selected card
   * @access   public
   * @property {EventEmitter<WhiteCard>} cardSelected
   */
  @Output()
  public cardSelected: EventEmitter<WhiteCard>;

  /**
   * The text of the card
   * @access   public
   * @property {WhiteCard} card
   */
  @Input()
  public card: WhiteCard;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {
    this.cardSelected = new EventEmitter<WhiteCard>();
  }

  /**
   * Gets triggered if the card was selected
   * and emits the text of the card
   * @access public
   * @return {void}
   */
  @HostListener('click', [ '$event' ])
  public onSelected($event: Event): void {
    of($event)
      .pipe(
        tap(console.log),
        finalize(() => {
          this.cardSelected.emit(<WhiteCard>{text: this.card.text, playerId: this.card.playerId});
        })
      ).subscribe();
  }
}
