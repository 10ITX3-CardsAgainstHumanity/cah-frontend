import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameRoomService} from '@services/game-room.service';
import {SnackbarService} from '@services/snackbar.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {PlayerService} from '@services/player.service';
import {Player, PlayerUI} from '@shared/models/player.model';
import {PlayerQuery} from '@store/queries/player.query';
import {GameRoomQuery} from '@store/queries/game-room.query';
import {BlackCard} from '@shared/models/black-card.model';
import {WhiteCard} from '@shared/models/white-card.model';
import {GeneralSettings, ResponseMessage, SelectedCards} from '@interfaces/responseMessage';
import {GameState} from '@store/states/game-room.state';
import {CardsService} from '@services/cards.service';
import {CardsQuery} from '@store/queries/cards.query';
import {Card, CardUI} from '@shared/models/card.model';

/**
 * The CahGameRoomComponent
 * @access public
 * @class
 * @export
 * @name CahGameRoomComponent
 */
@Component({
  selector: 'cah-game-room',
  templateUrl: './cah-game-room.component.html',
  styleUrls: ['./cah-game-room.component.scss']
})
export class CahGameRoomComponent implements OnInit, OnDestroy {

  /**
   * States if the game room is loading
   * @access public
   * @property {Observable<boolean>} gameRoomLoading$
   */
  public gameRoomLoading$: Observable<boolean>;

  /**
   * States the selected black card
   * @access   public
   * @property {Observable<BlackCard>} selectedBlackCard$
   */
  public selectedBlackCard$: Observable<BlackCard>;

  /**
   * States the selected white card
   * @access   public
   * @property {Observable<SelectedCards[]>} selectedWhiteCards$
   */
  public selectedWhiteCards$: Observable<SelectedCards[]>;

  /**
   * States the game state of the room
   * @access   public
   * @property {Observable<GameState>} currentGameState$
   */
  public currentGameState$: Observable<GameState>;

  /**
   * States the players that are currently in the game room
   * @access   public
   * @property {Observable<Player[]>} players$
   */
  public players$: Observable<(Player & PlayerUI)[]>;

  /**
   * States if the players are currently loading
   * @access   public
   * @property {Observable<boolean>} playersLoading$
   */
  public playersLoading$: Observable<boolean>;

  /**
   * States the local player
   * @access   public
   * @property {Observable<Player>} localPlayer$
   */
  public localPlayer$: Observable<(Player & PlayerUI)>;

  /**
   * States the local players cards
   * @access   public
   * @property {Observable<WhiteCard[]>} localPlayerCards$
   */
  public localPlayerCards$: Observable<(Card & CardUI)[]>;

  /**
   * The currently selected card group
   * @access   public
   * @property {Observable<SelectedCards>} selectedCardGroup$
   */
  public selectedCardGroup$: Observable<SelectedCards>;

  /**
   * The currently pre selected local cards
   * @access   public
   * @property {Observable<WhiteCard[]>} selectedLocalCards$
   */
  public selectedLocalCards$: Observable<WhiteCard[]>;

  /**
   * The game state enum
   * @access   public
   * @property {GameState} enum_GameState
   */
  public enum_GameState: typeof GameState;

  /**
   * Subject for takeUntil in the pipes to unsubscribe
   * @access   private
   * @property {Subject<void>} _ngUnSub
   */
  private _ngUnSub: Subject<void>;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   * @param  {CardsQuery}      _cardsQuery
   * @param  {PlayerQuery}     _playerQuery
   * @param  {GameRoomQuery}   _gameRoomQuery
   * @param  {CardsService}    _cardsService
   * @param  {PlayerService}   _playerService
   * @param  {GameRoomService} _gameRoomService
   * @param  {SnackbarService} _snackbarService
   */
  public constructor(private readonly _cardsQuery: CardsQuery,
                     private readonly _playerQuery: PlayerQuery,
                     private readonly _gameRoomQuery: GameRoomQuery,
                     private readonly _cardsService: CardsService,
                     private readonly _playerService: PlayerService,
                     private readonly _gameRoomService: GameRoomService,
                     private readonly _snackbarService: SnackbarService) {
    this._ngUnSub = new Subject<void>();

    this.enum_GameState = GameState;

    this.gameRoomLoading$ = this._gameRoomQuery.selectLoading();
    this.currentGameState$ = this._gameRoomQuery.selectGameState$;
    this.selectedBlackCard$ = this._gameRoomQuery.selectedBlackCard$;
    this.selectedCardGroup$ = this._gameRoomQuery.selectedCardGroup$;
    this.selectedWhiteCards$ = this._gameRoomQuery.selectedWhiteCards$;

    this.players$ = this._playerQuery.selectAllWithUI();
    this.localPlayer$ = this._playerQuery.selectActiveWithUI();
    this.playersLoading$ = this._playerQuery.selectLoading();
    this.localPlayerCards$ = this._cardsQuery.selectAllWithoutActive();
    this.selectedLocalCards$ = this._cardsQuery.selectActive();
  }

  /**
   * Subscribes to socket events
   * @access public
   * @return {void}
   */
  public ngOnInit(): void {
    this._gameRoomService.$onRoomPlayers
      .pipe(takeUntil(this._ngUnSub))
      .subscribe((response: ResponseMessage) => {
        this._playerService.upsertPlayers((response.msg as GeneralSettings).players);
      });

    this._gameRoomService.$onGameStart
      .pipe(
        takeUntil(this._ngUnSub),
        tap((response: ResponseMessage) => {
          this._cardsService.requestCards();
        })
      )
      .subscribe();

    this._gameRoomService.$onSelectedBlackCard
      .pipe(takeUntil(this._ngUnSub))
      .subscribe((response: ResponseMessage) => {
        this._cardsService.maxActiveCards = ((response.msg as GeneralSettings).card as BlackCard).neededAnswers;
      });

    this._gameRoomService.$onGameStateChange
      .pipe(takeUntil(this._ngUnSub))
      .subscribe();

    this._gameRoomService.$onSelectedWhiteCards
      .pipe(takeUntil(this._ngUnSub))
      .subscribe();

    this._gameRoomService.$onCzarSelectedWinner
      .pipe(takeUntil(this._ngUnSub))
      .subscribe((response: ResponseMessage) => {
        const { player } = (response.msg as GeneralSettings);
        this._playerService.setPlayerPoints(player.id, player.score);
      });

    this._gameRoomService.$onSelectWinner
      .pipe(takeUntil(this._ngUnSub))
      .subscribe();

    this._playerService.$onPlayerDeckFilled
      .pipe(
        takeUntil(this._ngUnSub),
        tap((response: ResponseMessage) => {
          console.log('deck filled');
          this._playerService.updateActiveUI({ isDeckFilled: true });
        })
      )
      .subscribe();

    this._playerService.$onPlayerCards
      .pipe(
        takeUntil(this._ngUnSub),
        tap((response: ResponseMessage) => {
          const { cards } = (response.msg as GeneralSettings);
          console.log('received cards', cards);
          this._cardsService.upsertCards(cards);
        })
      )
      .subscribe();

    this._playerService.$onPlayerCard
      .pipe(
        takeUntil(this._ngUnSub),
        tap((response: ResponseMessage) => {
          const { card } = (response.msg as GeneralSettings);
          console.log('got new card on the hand', card);
          this._cardsService.upsertCards(card as WhiteCard);
        })
      )
      .subscribe();

    this._playerService.$onNewCzar
      .pipe(takeUntil(this._ngUnSub))
      .subscribe();

    this._playerService.$onPlayerJoined
      .pipe(takeUntil(this._ngUnSub))
      .subscribe();

    this._playerService.$onPlayerLeft
      .pipe(takeUntil(this._ngUnSub))
      .subscribe();

    this._gameRoomService.requestPlayers();
  }

  /**
   * Closes all open subscriptions
   * @access public
   * @return {void}
   */
  public ngOnDestroy(): void {
    this._ngUnSub.next();
    this._ngUnSub.complete();
    this._gameRoomService.leaveGameRoom();
  }

  /**
   *
   * @access public
   * @return {void}
   */
  public startGame(): void {
    this._gameRoomService.startGame();
  }

  /**
   * Gets triggered white the card clicked on the player hand and marks them as active card
   * @access public
   * @param  {WhiteCard} card
   * @return {void}
   */
  public onWhiteCardSelected(card: WhiteCard): void {
    this._cardsService.toggleActive(card);
  }

  /**
   * Confirms the selection by sending the cards to the server
   * @access public
   * @return {void}
   */
  public confirmSelection(cards: WhiteCard[]) {
    const ids = cards.map((card: WhiteCard) => card.id);
    this._playerService.selectCards(ids);
    this._cardsService.removeCards(ids);
  }

  /**
   * Triggered when a card group was selected
   * @access public
   * @param  {SelectedCards} cardGroup
   * @return {void}
   */
  public onCardGroupSelected(cardGroup: SelectedCards): void {
    this._gameRoomService.setSelectedCardGroup(cardGroup);
  }

  /**
   * Confirms the group selection and sends the cards to the server
   * @access public
   * @return {void}
   */
  public confirmGroupSelection(cardGroup: SelectedCards): void {
    console.log('selected winner', cardGroup);
    this._gameRoomService.selectWinner(cardGroup.playerId);
  }
}
