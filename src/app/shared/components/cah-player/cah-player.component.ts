import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {WhiteCard} from '@shared/models/white-card.model';

@Component({
  selector: 'cah-player',
  templateUrl: './cah-player.component.html',
  styleUrls: ['./cah-player.component.scss']
})
export class CahPlayerComponent {

  /**
   * States if the cah player is the czar
   * @access    public
   * @property  {Observable<boolean>} isCzar$
   * @decorator Input
   */
  @Input()
  public isCzar$: Observable<boolean>;

  /**
   * The white cards of the active player
   * @access    public
   * @property  {Observable<WhiteCard[]>} localPlayerCards$
   * @decorator Input
   */
  @Input()
  public localPlayerCards$: Observable<WhiteCard[]>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {}
}
