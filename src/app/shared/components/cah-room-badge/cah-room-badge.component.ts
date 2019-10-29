import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GameRoomService} from '@services/game-room.service';
import {GameRoomQuery} from '@store/queries/game-room.query';
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
  public roomId$: Observable<string>;

  /**
   * Assigns the defaults
   * @access public
   * @param  {ActivatedRoute}  _route
   * @param  {GameRoomQuery}   _gameRoomQuery
   * @param  {GameRoomService} _gameRoomService
   * @constructor
   */
  public constructor(private readonly _route:           ActivatedRoute,
                     private readonly _gameRoomQuery:   GameRoomQuery,
                     private readonly _gameRoomService: GameRoomService) {
    this.roomId$ = this._gameRoomQuery.roomId$;
  }
}
