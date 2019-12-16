import {Injectable} from '@angular/core';
import {createPlayer, PlayerStore} from '@store/player.store';
import {ID} from '@datorama/akita';
import {WhiteCard} from '@shared/models/white-card.model';

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
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(private readonly _playerStore: PlayerStore) {}

  /**
   * Adds a player to the player store
   * @access public
   * @param  {string} id
   * @param  {string} username
   * @param  {string} fragment
   * @return {void}
   */
  public addPlayer(id: ID, username: string, fragment: string): void {
    const player = createPlayer({id, username, fragment});
    this._playerStore.add(player);
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
