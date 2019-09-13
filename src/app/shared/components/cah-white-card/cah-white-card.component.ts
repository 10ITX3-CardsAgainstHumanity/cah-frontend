import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {WhiteCard} from '../../interfaces/white-card';

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
   * @access public
   * @property {EventEmitter<WhiteCard>} cardSelected
   */
  @Output()
  public cardSelected: EventEmitter<WhiteCard>;

  /**
   * The text of the card
   * @access public
   * @property {string} cardText
   */
  @Input()
  public cardText: string;

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
  @HostListener('click')
  public onSelected(): void {
    this.cardSelected.emit(<WhiteCard>{text: this.cardText});
  }
}
