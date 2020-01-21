import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {tap} from 'rxjs/operators';
import {Player} from '@shared/models/player.model';
import {WhiteCard} from '@shared/models/white-card.model';
import {BlackCard} from '@shared/models/black-card.model';
import {GameRoomStore} from '@store/game-room.store';
import {GameRoomState} from '@store/states/game-room.state';

export interface ResponseMessage {
  status: boolean;
  msg?: {
    id?: string,
    username?: string,
    text?: string,
    neededAnswers?: string,
    state?: GameState
  };
}

export enum GameState {
  'undefined',
  'lobby',
  'selection',
  'judging'
}

/**
 * The game room services class
 * @access public
 * @class
 * @export
 * @name GameRoomService
 */
@Injectable({
  providedIn: 'root'
})
export class GameRoomService {

  /**
   * The id of the room
   * @access   public
   * @property {string} roomId
   */
  public roomId: string;

  /**
   * Observable state if a room was created
   * @access   public
   * @property {Observable<ResponseMessage>} $onRoomCreated
   */
  public $onRoomCreated: Observable<ResponseMessage> = this._socket.fromEvent('game.create');

  /**
   * Observable state if the player has joined the room
   * @access   public
   * @property {Observable<ResponseMessage>} $onRoomJoined
   */
  public $onRoomJoined: Observable<ResponseMessage> = this._socket.fromEvent('game.join');

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(private readonly _socket:        Socket,
                     private readonly _gameRoomStore: GameRoomStore) {
    this.roomId = null;
  }

  /**
   * Emits a event that informs the server
   * that the user wishes to create / host a new game
   * room instance
   * @access public
   * @param  {string} username
   * @param  {string} roomId
   * @return {void}
   */
  public createGameRoom(username: string, roomId: string): void {
    this._socket.emit('game.create', { username, roomId });
    this.roomId = roomId;
  }

  /**
   * Emits a event that informs the
   * server that the user wants to
   * join an existing game room.
   * @access public
   * @param  {string} username
   * @param  {string} roomId
   * @return {void}
   */
  public joinGameRoom(username: string, roomId: string): void {
    this._socket.emit('game.join', { username, roomId });
    this.roomId = roomId;
  }

  /**
   * Requests the game room states from the backend
   * @access public
   * @return {void}
   */
  public requestGameState(): void {
    this.onGameStateResponse().subscribe();
    this._socket.emit('game.room.request.states');
  }

  /**
   * Listens for the game states request response
   * @access public
   * @return {Observable<GameRoomState>}
   */
  public onGameStateResponse(): Observable<GameRoomState> {
    return this._socket.fromEvent('game.room.response.states')
      .pipe(tap((state: GameRoomState) => this._gameRoomStore.update(state)));
  }

  /**
   * Gets triggered if a user left the game room
   * so we can update our players accordingly
   * @access public
   * @return {Observable<Player[]>}
   */
  public onPlayerLeave(): Observable<Player[]> {
    return this._socket.fromEvent('game.room.player.leaved')
      // .pipe(tap((players: Player[]) => this._gameRoomStore.update({players})));
  }

  /**
   * Emits the start event for the game
   * @access public
   * @return {void}
   */
  public startGame(): void {
    this._socket.emit('game.room.start');
  }

  /**
   * Gets triggered when the game was started
   * @access public
   * @return {Observable<object>}
   */
  public onStartGame(): Observable<object> {
    return this._socket.fromEvent('game.room.started')
      // .pipe(tap(() => this._gameRoomStore.update({ started: true })));
  }

  /**
   * Gets triggered when the game room is full
   */
  public onRoomFull(): Observable<object> {
    return this._socket.fromEvent('game.room.full')
      // .pipe(tap(() => this._gameRoomStore.update({ roomIsFull: true, started: true })));
  }

  /**
   * Requests a set of cards from the socket endpoint
   * @access public
   * @param  {number} amount
   * @return {void}
   */
  public requestPlayerCards(amount: number): void {
    this._socket.emit('game.room.request.cards', {amount});
  }

  /**
   * Gets triggered when the response from the request player cards
   * comes back to us and gives us a array of cards that get added to
   * the end of our already populated array of white cards
   * @access public
   * @return {void}
   */
  public onPlayerRequestCards(): Observable<WhiteCard[]> {
    return this._socket.fromEvent('game.room.response.cards')
      // .pipe(tap((cards: WhiteCard[]) => this._gameRoomStore.update({cards})));
  }

  /**
   * Emits a event to inform the backend that were ready to play
   * @access public
   * @param  {string} username
   * @return {void}
   */
  public playerIsReady(username): void {
    this._socket.emit('game.room.player.ready', {username});
  }

  /**
   * Gets triggered if a player is ready
   * and carries the user that is ready
   * @access public
   * @return {Observable<Player>}
   */
  public onPlayerReady(): Observable<Player> {
    return this._socket.fromEvent('game.room.player.isReady');
      // .pipe(tap()) set the player in the store to ready
  }

  /**
   * Gets triggered if all players are ready
   * @access public
   * @return {Observable<Player[]>}
   */
  public onAllPlayersReady(): Observable<Player[]> {
    return this._socket.fromEvent('game.room.players.ready');
  }

  /**
   * Gets triggered if the next czar got selected
   * @access public
   * @return {Observable<Player>}
   */
  public onNextCzarSelected(): Observable<Player> {
    return this._socket.fromEvent('game.room.nextCzar');
      // set czar on player in store
  }

  /**
   * Requests a black card from the backend
   * @access public
   * @return {void}
   */
  public requestBlackCard(): void {
    this._socket.emit('game.room.request.blackCard');
  }

  /**
   * Gets triggered when the black card request was issued
   * and carries a black card in its body
   * @access public
   * @return {Observable<BlackCard>}
   */
  public onBlackCardResponse(): Observable<BlackCard> {
    return this._socket.fromEvent('game.room.response.blackCard');
  }

  /**
   * Gets triggered when the backend is ready to accept white cards
   * @access public
   * @return {Observable<void>}
   */
  public onAcceptingWhiteCards(): Observable<object> {
    return this._socket.fromEvent('game.room.accepting.whiteCards')
      .pipe(tap(() => {
        this._socket.emit('game.room.accepting.whiteCards.ack');
      }));
  }

  /**
   * Gets emitted when all necessary white cards were selected by the user
   * @access public
   * @param  {WhiteCard[]} cards
   * @return {void}
   */
  public whiteCardsSelected(cards: WhiteCard[]): void {
    this._socket.emit('game.room.whiteCards.selected', {cards});
  }

  /**
   * Gets triggered when the player wasnt fast enough to select its cards
   * and the server skips him
   * @access public
   * @return {Observable<object>}
   */
  public onRountTimeout(): Observable<object> {
    return this._socket.fromEvent('game.room.round.timeout');
  }

  /**
   * Gets triggered when all players have submitted they're
   * white cards and the server responds with this event
   * @access public
   * @return {Observable<object>}
   */
  public onAllWhiteCardsSelected(): Observable<object> {
    return this._socket.fromEvent('game.room.allWhiteCards.selected');
  }

  /**
   * Emits a event that chooses the black card
   * @access public
   * @param {BlackCard} card
   */
  public czarPickBlackCard(card: BlackCard): void {
    this._socket.emit('game.room.blackCard.picked', {card});
  }

  /**
   * Gets triggered when the czar picked his favourite cards
   * @access public
   * @return {Observable<object>}
   */
  public onCzarPickedCards(): Observable<object> {
    return this._socket.fromEvent('game.room.whiteCards.picked');
  }

  /**
   * Gets triggered when the scoreboard needs to be updated
   * @access public
   * @return {Observable<object>}
   */
  public onUpdateScoreboard(): Observable<object> {
    return this._socket.fromEvent('game.room.update.scoreboard')
      .pipe(tap(() => {
        this._socket.emit('game.room.update.scoreboard.ack');
      }));
  }

  /**
   * Gets triggered when the next round is about to start
   * @access public
   * @return {Observable<object>}
   */
  public onRoundStartingIn(): Observable<object> {
    return this._socket.fromEvent('game.room.round.startingIn');
  }
}
