import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CahGameRoomComponent} from './cah-game-room.component';
import {SharedModule} from '@shared/shared.module';
import {MatButtonModule} from '@angular/material';
import {CahPlayerModule} from '@app/core/components/cah-player/cah-player.module';
import {CahRoomBadgeModule} from '@app/core/components/cah-room-badge/cah-room-badge.module';
import {CahScoreboardModule} from '@app/core/components/cah-scoreboard/cah-scoreboard.module';
import {CahSelectedCardsModule} from '@app/core/components/cah-selected-cards/cah-selected-cards.module';

const routes: Routes = [
  {path: '', component: CahGameRoomComponent}
];

@NgModule({
  declarations: [CahGameRoomComponent],
    imports: [
        CommonModule,
        SharedModule,
        CahPlayerModule,
        CahRoomBadgeModule,
        CahScoreboardModule,
        CahSelectedCardsModule,
        RouterModule.forChild(routes),
        MatButtonModule,
    ],
  exports: [
    RouterModule
  ]
})
export class CahGameRoomModule {
}
