import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {tap} from 'rxjs/operators';
import {GameRoomStore} from '@shared/store/game-room.store';
import {GameRoomState} from '@interfaces/game-room-state';
import {Player} from '@interfaces/player';

export enum EVENTS {
  GAME_CREATE   = 'game.room.create',
  GAME_CREATED  = 'game.room.created',

  GAME_JOIN     = 'game.room.join',
  GAME_JOINED   = 'game.room.joined',

  PLAYER_JOINED = 'game.room.player.joined',
  PLAYER_LEAVED = 'game.room.player.leaved',
}

/**
 * The game room service class
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
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(private readonly _socket: Socket,
                     private readonly _gameRoomStore: GameRoomStore) {

    // this.$player      = this._socket.fromEvent('game.room.me');
    // this.$players     = this._socket.fromEvent('game.room.players');
    // this.$roomState   = this._socket.fromEvent('game.room.state');

  }

  /**
   * Emits a event that informs the server
   * that the user wishes to create / host a new game
   * room instance
   * @access public
   * @param  {string} username
   * @param  {string} gameId
   * @return {void}
   */
  public createGameRoom(username: string, gameId: string): void {
    this._socket.emit('game.room.create', {gameId, username});
  }

  /**
   * Listens for the `game.room.created` event
   * and taps into the observable to update the store
   * @access public
   * @return {Observable<any>}
   */
  public onGameRoomCreated(): Observable<string> {
    return this._socket.fromEvent('game.room.created')
      .pipe(tap((gameId: string) => this._gameRoomStore.update({gameId})));
  }

  /**
   * Emits a event that informs the
   * server that the user wants to
   * join an existing game room.
   * @access public
   * @param  {string} username
   * @param  {string} gameId
   * @return {void}
   */
  public joinGameRoom(username: string, gameId: string): void {
    this.onGameRoomJoined()
      .pipe(tap(() => this.requestGameState()));
    this._socket.emit('game.room.join', {username, gameId});
  }

  /**
   * Listens on the `game.room.joined` event and then sets the
   * game id, the players that already are in this room, the
   * state of the room
   */
  public onGameRoomJoined(): Observable<object> {
    return this._socket.fromEvent('game.room.joined')
        .pipe(tap(() => this._gameRoomStore.update({joined: true})));
  }

  /**
   * Requests the game room state from the backend
   * @access public
   * @return {void}
   */
  public requestGameState(): void {
    this.onGameStateResponse();

    this._socket.emit('game.room.request.state');
  }

  /**
   * Listens for the game state request response
   */
  public onGameStateResponse(): Observable<GameRoomState> {
    return this._socket.fromEvent('game.room.response.state')
      .pipe(tap((state: GameRoomState) => {
        this.onPlayerJoin();
        this.onPlayerLeave();
      }));
  }

  public onPlayerJoin(): Observable<Player[]> {
    return this._socket.fromEvent('game.room.player.joined')
      .pipe(tap((players: Player[]) => {
        this._gameRoomStore.update({ players });
      }));
  }

  public onPlayerLeave(): Observable<Player[]> {
    return this._socket.fromEvent('game.room.played.leaved')
      .pipe(tap((players: Player[]) => {
        this._gameRoomStore.update({players});
      }));
  }
}
