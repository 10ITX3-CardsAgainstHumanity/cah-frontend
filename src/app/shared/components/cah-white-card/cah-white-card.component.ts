import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {revealCard} from '@shared/animations/revealCard';
import {WhiteCard} from '@shared/models/white-card.model';
import {finalize} from 'rxjs/operators';
import {trigger} from '@angular/animations';
import {of} from 'rxjs';

/**
 * The white card class
 * @access public
 * @class
 * @export
 * @name CahWhiteCardComponent
 */
@Component({
  selector: 'cah-white-card',
  template: `
    <div class="whitecard" [@revealCard]="card.dummy ? 'hidden' : 'revealed'">
      <div class="whitecard__front"> <!-- *ngIf="!card.dummy"-->
        <h2 class="whitecard__header">{{ card.text }}</h2>
        <div class="whitecard__caption--front">
          <p>Cards</p>
          <p>Against</p>
          <p>Humanity</p>
        </div>
        <div class="whitecard__icon">
          <div class="whitecard__icon--full"></div>
          <div class="whitecard__icon--slanted"></div>
        </div>
      </div>
      <div class="whitecard__back">
        <div class="whitecard__caption--back">
          <p>Cards</p>
          <p>Against</p>
          <p>Humanity</p>
        </div>
      </div>
    </div>

  `,
  styleUrls: ['./cah-white-card.component.scss'],
  animations: [
    trigger('revealCard', revealCard)
  ]
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
  @HostListener('click', ['$event'])
  public onSelected($event: Event): void {
    of($event)
      .pipe(
        finalize(() => this.cardSelected.emit(<WhiteCard>{text: this.card.text, playerId: this.card.playerId}))
      ).subscribe();
  }
}
