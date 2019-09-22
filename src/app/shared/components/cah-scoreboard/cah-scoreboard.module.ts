import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CahScoreboardComponent} from './cah-scoreboard.component';
import {CahScoreboardListComponent} from './cah-scoreboard-list/cah-scoreboard-list.component';
import {CahScoreboardItemComponent} from './cah-scoreboard-item/cah-scoreboard-item.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [CahScoreboardComponent, CahScoreboardListComponent, CahScoreboardItemComponent],
  exports: [
    CahScoreboardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class CahScoreboardModule {
}
