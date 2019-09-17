import {NgModule} from '@angular/core';
import {CahBlackCardModule} from './components/cah-black-card/cah-black-card.module';
import {CahWhiteCardModule} from './components/cah-white-card/cah-white-card.module';
import {CahScoreboardModule} from './components/cah-scoreboard/cah-scoreboard.module';
import {CommonModule} from '@angular/common';
import {CahPlayerModule} from './components/cah-player/cah-player.module';
import {CahPlayerHandModule} from './components/cah-player-hand/cah-player-hand.module';
import {CahSelectedCardsModule} from './components/cah-selected-cards/cah-selected-cards.module';
import { CahRoomBadgeComponent } from './components/cah-room-badge/cah-room-badge.component';
import {CahRoomBadgeModule} from './components/cah-room-badge/cah-room-badge.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CahPlayerModule,
    CahBlackCardModule,
    CahWhiteCardModule,
    CahScoreboardModule,
    CahPlayerHandModule,
    CahRoomBadgeModule,
    CahSelectedCardsModule,
  ]
})
export class SharedModule {
}
