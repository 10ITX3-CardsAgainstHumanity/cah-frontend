import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CahScoreboardComponent} from './cah-scoreboard.component';
import {CahScoreboardListComponent} from './cah-scoreboard-list/cah-scoreboard-list.component';
import {CahScoreboardItemComponent} from './cah-scoreboard-item/cah-scoreboard-item.component';

@NgModule({
  declarations: [CahScoreboardComponent, CahScoreboardListComponent, CahScoreboardItemComponent],
  exports: [
    CahScoreboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CahScoreboardModule {
}
