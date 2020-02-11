import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'cah-room-badge',
  templateUrl: './cah-room-badge.component.html',
  styleUrls: ['./cah-room-badge.component.scss']
})
export class CahRoomBadgeComponent {

  /**
   * Observable of the room id
   * @access   public
   * @property {Observable<string>}
   */
  @Input()
  public roomId$: Observable<string>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {
  }
}
