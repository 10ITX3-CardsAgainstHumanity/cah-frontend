import {Injectable} from '@angular/core';
import {createPlayer, PlayerStore} from '@store/player.store';
import {ID} from '@datorama/akita';
import {WhiteCard} from '@shared/models/white-card.model';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ResponseMessage} from '@services/game-room.service';
import {Socket} from 'ngx-socket-io';

/**
 * The PlayerService class
 * @access public
 * @class
 * @export
 * @name PlayerService
 */
@Injectable({providedIn: 'root'})
export class PlayerService {

  /**
   * Observable state if a player has joined the room
   * @access   public
   * @property {Observable<ResponseMessage>} $onPlayerJoined
   */
  public $onPlayerJoined: Observable<ResponseMessage> = this._socket.fromEvent('player.join')
    .pipe(
      tap((response: ResponseMessage) => {
        const { id, username } = response.msg;
        this.addPlayer(id, username);
      })
    );

  public $onPlayerLeft: Observable<ResponseMessage> = this._socket.fromEvent('player.leave')
    .pipe(
      tap((response: ResponseMessage) => {
        const { id } = response.msg;
        this.removePlayer(id);
      })
    );

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(private readonly _socket:      Socket,
                     private readonly _playerStore: PlayerStore) {}

  /**
   * Adds a player to the player store
   * @access public
   * @param  {string} id
   * @param  {string} username
   * @param  {string} fragment
   * @return {void}
   */
  public addPlayer(id: ID, username: string): void {
    const player = createPlayer({id, username});
    this._playerStore.add(player);
  }

  /**
   * Sets the active player (also known as you) to the given id
   * @access public
   * @param  {ID} id
   * @return {void}
   */
  public setActivePlayer(id: ID): void {
    this._playerStore.setActive(id);
  }

  /**
   * Removes a player from the store
   * @access public
   * @return {void}
   */
  public removePlayer(id: ID): void {
    this._playerStore.remove(id);
  }

  /**
   * Updates a player
   * @access public
   * @return {void}
   */
  public updatePlayerCards(cards: WhiteCard[]): void {
    this._playerStore.addCardsToActivePlayer(cards);
  }

  /**
   *
   * @param id
   */
  public setCzarTo(id: ID): void {
    this._playerStore.update(id, {
      isCzar: true
    });
  }

  /**
   * Changes the the czar state of the provided
   * and id to true and set everyone else to false
   * @access public
   * @param  {string} id The id to change the czar to
   * @return {void}
   */
  public changeCzarTo(id: ID): void {
    this._playerStore.update(null, {
      isCzar: false
    });
    this._playerStore.update(id, {
      isCzar: true
    });
  }

  /**
   * Sets the specified id to the leading player
   * @access public
   * @param  {string} id
   * @return {void}
   */
  public setLeading(id: ID): void {
    this._playerStore.update(id, {
      isLeading: true
    });
  }

  /**
   * Updates the players points to the specified number
   * @access public
   * @param  {ID}     id
   * @param  {number} points
   * @return {void}
   */
  public setPlayerPoints(id: ID, points: number): void {
    this._playerStore.update(id, {
      points
    });
  }
}
