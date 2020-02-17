import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CahGameRoomComponent} from './cah-game-room.component';
import {SharedModule} from '@shared/shared.module';
import {MatButtonModule} from '@angular/material';
import {CahRoomBadgeModule} from '@app/core/components/cah-room-badge/cah-room-badge.module';
import {CahScoreboardModule} from '@app/core/components/cah-scoreboard/cah-scoreboard.module';
import {CahSelectedCardsModule} from '@app/core/components/cah-selected-cards/cah-selected-cards.module';
import {CahPlayerHandModule} from '@app/core/components/cah-player-hand/cah-player-hand.module';

const routes: Routes = [
  {path: '', component: CahGameRoomComponent}
];

@NgModule({
  declarations: [CahGameRoomComponent],
  imports: [
    CommonModule,
    SharedModule,
    CahRoomBadgeModule,
    CahScoreboardModule,
    CahSelectedCardsModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    CahPlayerHandModule,
  ],
  exports: [
    RouterModule
  ]
})
export class CahGameRoomModule {
}
