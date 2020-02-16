import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {GameRoomStore} from '@store/game-room.store';
import {tap} from 'rxjs/operators';
import {SnackbarService} from '@services/snackbar.service';
import {GeneralSettings, ResponseMessage, SelectedCards} from '@interfaces/responseMessage';
import {GameRoomState, GameState} from '@store/states/game-room.state';
import {BlackCard} from '@shared/models/black-card.model';
import {ID} from '@datorama/akita';

/**
 * The game room services class
 * @access public
 * @class
 * @export
 * @name GameRoomService
 */
@Injectable({providedIn: 'root'})
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
   * Observable state of the currently chosen black card
   * @access   public
   * @property {Observable<ResponseMessage>} $onSelectedBlackCard
   */
  public $onSelectedBlackCard: Observable<ResponseMessage> = this._socket.fromEvent('game.cards.black')
    .pipe(
      tap((response: ResponseMessage) => {
        console.log('got black card')
        const { id, text, neededAnswers } = (response.msg as GeneralSettings).card as BlackCard;
        this._gameRoomStore.updateBlackCard({ id, text, neededAnswers });
      })
    );

  /**
   * Observable state if the game has started
   * @access   public
   * @property {Observable<ResponseMessage>} $onGameStart
   */
  public $onGameStart: Observable<ResponseMessage> = this._socket.fromEvent('game.start')
    .pipe(
      tap((response: ResponseMessage) => {
        console.log('game starts');

        this._gameRoomStore.updateGameState(GameState.START);
      })
    );

  /**
   * Observable state of the game state
   * @access   public
   * @property {Observable<ResponseMessage>} $onGameStateChange
   */
  public $onGameStateChange: Observable<ResponseMessage> = this._socket.fromEvent('game.state')
    .pipe(
      tap((response: ResponseMessage) => {
        console.log('game state changed', (response.msg as GeneralSettings).state);
        // TODO: Visualize the game state change
        this._gameRoomStore.updateGameState((response.msg as GeneralSettings).state);
      })
    );

  /**
   * Observable state of the selected white cards
   * @access   public
   * @property {Observable<ResponseMessage>} $onSelectedWhiteCards
   */
  public $onSelectedWhiteCards: Observable<ResponseMessage> = this._socket.fromEvent('game.players.cards')
    .pipe(
      tap((response: ResponseMessage) => {
        const cards = response.msg as SelectedCards[];
        console.log('all users have chosen a card', cards);
        this._gameRoomStore.setWhiteCards(cards);
      })
    );

  /**
   * Observable state if the czar selected a winner
   * @access   public
   * @property {Observable<ResponseMessage>} $onCzarSelectedWinner
   */
  public $onCzarSelectedWinner: Observable<ResponseMessage> = this._socket.fromEvent('game.czar.judged')
    .pipe(
      tap((response: ResponseMessage) => {
        this._gameRoomStore.reset();
      })
    );

  /**
   * Observable state if the local player selected a valid player id or not
   * @access   public
   * @property {Observable<ResponseMessage>} $onSelectWinner
   */
  public $onSelectWinner: Observable<ResponseMessage> = this._socket.fromEvent('game.czar.judge');

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor(private readonly _socket: Socket,
                     private readonly _gameRoomStore: GameRoomStore,
                     private readonly _snackbarService: SnackbarService) {
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
    this._socket.emit('game.create', {username, roomId});
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
    this._socket.emit('game.join', {username, roomId});
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
   * Starts the game
   * @access public
   * @return {void}
   */
  public startGame(): void {
    this._socket.emit('game.start');
  }

  /**
   * Requests all players that are currently in the room
   * @access public
   * @return {void}
   */
  public requestPlayers(): void {
    this._socket.emit('game.players');
  }

  /**
   * Selects the winner id
   * @access public
   * @return {void}
   */
  public selectWinner(playerId: ID): void {
    this._socket.emit('game.czar.judge', { playerId });
  }

  /**
   * Sets the selected card group
   * @access public
   * @param  {SelectedCards} cardGroup
   * @return {void}
   */
  public setSelectedCardGroup(cardGroup: SelectedCards) {
    this._gameRoomStore.update((state: Readonly<GameRoomState>) => {
      return {
        ...state,
        selectedCardGroup: cardGroup
      };
    });
  }
}
