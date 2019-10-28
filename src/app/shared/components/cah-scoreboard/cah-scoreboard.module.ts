import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CahScoreboardComponent} from './cah-scoreboard.component';
import {CahScoreboardItemComponent} from './cah-scoreboard-item/cah-scoreboard-item.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [CahScoreboardComponent, CahScoreboardItemComponent],
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
