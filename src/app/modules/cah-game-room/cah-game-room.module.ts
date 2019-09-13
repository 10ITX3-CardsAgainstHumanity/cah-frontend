import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CahGameRoomComponent} from './cah-game-room.component';
import {SharedModule} from '../../shared/shared.module';
import {CahSelectedCardsModule} from '../../shared/components/cah-selected-cards/cah-selected-cards.module';
import {CahScoreboardModule} from '../../shared/components/cah-scoreboard/cah-scoreboard.module';
import {CahPlayerModule} from '../../shared/components/cah-player/cah-player.module';

const routes: Routes = [
  {path: '', component: CahGameRoomComponent}
];

@NgModule({
  declarations: [CahGameRoomComponent],
  imports: [
    CommonModule,
    SharedModule,
    CahPlayerModule,
    CahScoreboardModule,
    CahSelectedCardsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CahGameRoomModule {
}
