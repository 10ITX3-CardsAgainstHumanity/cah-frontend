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
    state?: keyof typeof GameState,
    card?: Partial<BlackCard>,
    cards?: Partial<WhiteCard>[],
    player?: Partial<Player>,
    players?: Partial<Player>[],
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
@Injectable({ providedIn: 'root' })
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
   * Observable state of the players that are currently in the room
   * @access   public
   * @property {Observable<ResponseMessage>} $onRoomPlayers
   */
  public $onRoomPlayers: Observable<ResponseMessage> = this._socket.fromEvent('game.players');

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
   * Leaves the current game
   * @access public
   * @return {void}
   */
  public leaveGameRoom(): void {
    this._socket.emit('game.leave');
  }

  /**
   * Requests all players that are currently in the room
   * @access public
   * @return {void}
   */
  public requestPlayers(): void {
    this._socket.emit('game.players');
  }
}
