import {Injectable} from '@angular/core';
import {BlackCard} from '../interfaces/black-card';
import {WhiteCard} from '../interfaces/white-card';
import {BehaviorSubject, Observable} from 'rxjs';
import {Player} from '../interfaces/player';

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
   * The currently selected black card
   * @access   public
   * @property {Observable<BlackCard>}
   */
  public selectedBlackCard$: Observable<BlackCard>;

  /**
   * The currently selected white cards
   * @access   public
   * @property {Observable<WhiteCard[]>}
   */
  public selectedWhiteCards$: Observable<WhiteCard[]>;

  /**
   * Observable of all players currently playing in this game room
   * @access public
   * @property {Observable<Player[]>} players
   */
  public players$: Observable<Player[]>;

  /**
   * The observable of the player playing this session
   * @access public
   * @property {Observable<Player>} player
   */
  public player$: Observable<Player>;

  /**
   * Observable of all cards that the player currently has on his hand
   * @access public
   * @property {Observable<WhiteCard[]>} playerCards
   */
  public playerCards$: Observable<WhiteCard[]>;

  /**
   * The cards that the player currently has on his hand
   * @access public
   * @property {BehaviorSubject<WhiteCard[]>} playerCards
   */
  private _playerCards: BehaviorSubject<WhiteCard[]>;

  /**
   * All players currently playing in this game room
   * @access private
   * @property {BehaviorSubject<Player[]>} _players
   */
  private _players: BehaviorSubject<Player[]>;

  /**
   * The client playing in the session
   * @access private
   * @property {BehaviorSubject<Player>} _player
   */
  private _player: BehaviorSubject<Player>;

  /**
   * The subject for the currently selected black card
   * @access private
   * @property {BehaviorSubject<BlackCard>} _selectedBlackCard
   */
  private _selectedBlackCard: BehaviorSubject<BlackCard>;

  /**
   * The subject for the currently selected white cards
   * @access private
   * @property {BehaviorSubject<WhiteCard[]>} _selectedWhiteCards
   */
  private _selectedWhiteCards: BehaviorSubject<WhiteCard[]>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {
    this._selectedBlackCard = new BehaviorSubject<BlackCard>({text: '____.', maxPlayableWhiteCards: 1, playerId: 0});
    this._selectedWhiteCards = new BehaviorSubject<WhiteCard[]>([]);
    this._selectedBlackCard = new BehaviorSubject<BlackCard>({
      text: '____.',
      maxPlayableWhiteCards: 1,
      playerId: 0
    });
    this._playerCards = new BehaviorSubject<WhiteCard[]>([
      {
        text: 'Ein gebleichtes Arschloch',
        playerId: 0,
      },
      {
        text: 'Ein Mikropenis',
        playerId: 0,
      },
      {
        text: 'Ein Hirntumor',
        playerId: 0,
      },
      {
        text: 'Meine Genitalien',
        playerId: 0,
      },
      {
        text: 'Resteficken',
        playerId: 0,
      },
      {
        text: 'Postnatale Abtreibung',
        playerId: 0,
      },
      {
        text: 'Gruppensex in der Demenzklinik',
        playerId: 0,
      },
      {
        text: 'Deiner Partnerin einen Dreier mit ihrer Muttervorschlagen',
        playerId: 0,
      },
      {
        text: 'Ein epileptischer Anfall bei der Bombenentschärfung',
        playerId: 0,
      },
      {
        text: 'Verschwörungstheorien',
        playerId: 0,
      }
    ]);
    this._players = new BehaviorSubject<Player[]>([
      {
        id: '1',
        username: 'player 1',
        fragment: '3323',
        points: 3,
        isCzar: false
      },
      {
        id: '2',
        username: 'player 2',
        fragment: '5435',
        points: 0,
        isCzar: false
      },
      {
        id: '3',
        username: 'player 3',
        fragment: '6573',
        points: 4,
        isCzar: false
      },
      {
        id: '4',
        username: 'player 4',
        fragment: '4563',
        points: 2,
        isCzar: false
      }
    ]);
    this._player = new BehaviorSubject<Player>({
      id: '3',
      username: 'luii',
      fragment: '6573',
      points: 4,
      isCzar: false
    });

    this.selectedWhiteCards$ = this._selectedWhiteCards.asObservable();
    this.selectedBlackCard$ = this._selectedBlackCard.asObservable();
    this.playerCards$ = this._playerCards.asObservable();
    this.players$ = this._players.asObservable();
    this.player$ = this._player.asObservable();
  }

  /**
   * Adds the selected white card to the selected stack
   * @access public
   * @param  {WhiteCard[]} cards
   * @return {void}
   */
  public addSelectedWhiteCard(cards: WhiteCard[]): void {
    const whiteCards = this._selectedWhiteCards.value;
    whiteCards.push(...cards);
    this._selectedWhiteCards.next(whiteCards);
  }

  /**
   * Removes a card from the players hand
   * @access public
   * @param  {number} index
   * @return {void}
   */
  public removeCardFromHand(index: number): void {
    const cards = this._playerCards.value;
    cards.splice(index, 1);
    this._playerCards.next(cards);
  }
}
