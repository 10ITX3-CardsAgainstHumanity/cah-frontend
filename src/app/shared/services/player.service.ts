import {Injectable} from '@angular/core';
import {createPlayer, createPlayerUI, PlayerStore} from '@store/player.store';
import {ID} from '@datorama/akita';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Socket} from 'ngx-socket-io';
import {Player, PlayerUI} from '@shared/models/player.model';
import {SnackbarService} from '@services/snackbar.service';
import {GeneralSettings, ResponseMessage} from '@interfaces/responseMessage';

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
        console.log('player joined')
        const { id, username } = (response.msg as GeneralSettings).player;
        this.addPlayer(id, username);
        this._snackbarService.show(`${(response.msg as GeneralSettings).player.username} ist dem Spiel beigetreten.`);
      })
    );

  /**
   * Observable state if a player has left the room
   * @access   public
   * @property {Observable<ResponseMessage>} $onPlayerLeft
   */
  public $onPlayerLeft: Observable<ResponseMessage> = this._socket.fromEvent('player.leave')
    .pipe(
      tap((response: ResponseMessage) => {
        console.log('player left')
        const { id } = (response.msg as GeneralSettings).player;
        this.removePlayer(id);
        this._snackbarService.show(`${(response.msg as GeneralSettings).player.username} hat das Spiel verlassen.`);
      })
    );

  /**
   * Observable state if there is a new czar
   * @access   public
   * @property {Observable<ResponseMessage>} $onNewCzar
   */
  public $onNewCzar: Observable<ResponseMessage> = this._socket.fromEvent('player.czar')
    .pipe(
      tap((response: ResponseMessage) => {
        const { id } = (response.msg as GeneralSettings).player;
        console.log('czar is:', (response.msg as GeneralSettings).player.username);
        this.changeCzar(id);
        this._snackbarService.show(`${(response.msg as GeneralSettings).player.username} ist nun Czar!`);
      })
    );

  /**
   * Observable state if the local player's deck is ready
   * @access   public
   * @property {Observable<ResponseMessage>} $onPlayerDeckFilled
   */
  public $onPlayerDeckFilled: Observable<ResponseMessage> = this._socket.fromEvent('player.cards.ready');

  /**
   * Observable state if the player has requested the cards
   * @access   public
   * @property {Observable<ResponseMessage>} $onPlayerCards
   */
  public $onPlayerCards: Observable<ResponseMessage> = this._socket.fromEvent('player.cards');

  /**
   * Observable state if a new card was added to the players card deck
   * @access   public
   * @property {Observable<ResponseMessage>} $onPlayerCard
   */
  public $onPlayerCard: Observable<ResponseMessage> = this._socket.fromEvent('player.card');

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(private readonly _socket:      Socket,
                     private readonly _playerStore: PlayerStore,
                     private readonly _snackbarService: SnackbarService) {}

  /**
   * Adds a player to the player store
   * @access public
   * @param  {string} id
   * @param  {string} username
   * @return {void}
   */
  public addPlayer(id: ID, username: string): void {
    const player = createPlayer({id, username});
    this._playerStore.add(player);
  }

  /**
   * Upsert players into the store (insert or update existing)
   * @access   public
   * @return {void}
   */
  public upsertPlayers(players: (Player & PlayerUI) | (Player & PlayerUI)[]): void {
    if (! Array.isArray(players)) { players = [players]; }

    this._playerStore.upsertMany(players.map((player: (Player & PlayerUI)) => createPlayer(player)));
    this._playerStore.ui.upsertMany(players.map((player: (Player & PlayerUI)) => createPlayerUI(player)));
  }

  /**
   * Sets the active player (also known as you) to the given id
   * @access public
   * @param  {ID} id
   * @return {void}
   */
  public setActive(id: ID): void {
    this._playerStore.setActive(id);
    this._playerStore.ui.setActive(id);
  }

  /**
   * Updates the active player
   * @access public
   * @param  newState
   * @return {void}
   */
  public updateActive(newState: { [prop: string]: any }): void {
    this._playerStore.updateActive((activePlayer: Readonly<Player>) => {
      return {
        ...activePlayer,
        ...newState
      };
    });
  }

  /**
   * Updates the active player ui
   * @access public
   * @param  newState
   * @return {void}
   */
  public updateActiveUI(newState: { [prop: string]: any }): void {
    this._playerStore.ui.updateActive((activePlayerUI: Readonly<PlayerUI>) => {
      return {
        ...activePlayerUI,
        ...newState
      };
    });
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
   * Changes the the czar state of the provided
   * and id to true and set everyone else to false
   * @access public
   * @param  {string} id The id to change the czar to
   * @return {void}
   */
  public changeCzar(id: ID): void {
    // set every player isCzar to false
    this._playerStore.ui.update(null, {
      isCzar: false
    });
    // only set the provided id to true
    this._playerStore.ui.update(id, {
      isCzar: true
    });
  }

  /**
   * Sets the specified id to the leading player
   * @access public
   * @param  {string} id
   * @return {void}
   */
  public changeLeading(id: ID): void {
    // first set isLeading on all players in the store to false
    this._playerStore.ui.update(null, {
      isLeading: false
    });
    // and update only the one with the id
    this._playerStore.ui.update(id, {
      isLeading: true
    });
  }

  /**
   * Updates the players points to the specified number
   * @access public
   * @param  {ID}     id
   * @param  {number} score
   * @return {void}
   */
  public setPlayerPoints(id: ID, score: number): void {
    this._playerStore.update(id, (player: Readonly<Player>) => {
      return {
        ...player,
        score
      };
    });
  }

  /**
   * Selects a card from the white cards on the players hand and makes a socket request
   * @access public
   * @param  {ID} cardIds
   * @return {void}
   */
  public selectCards(cardIds: ID[]): void {
    this._socket.emit('player.cards.choose', { cardIds });
  }
}
