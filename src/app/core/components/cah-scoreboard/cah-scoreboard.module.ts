import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CahScoreboardComponent} from './cah-scoreboard.component';
import {CahScoreboardItemComponent} from './cah-scoreboard-item/cah-scoreboard-item.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [CahScoreboardComponent, CahScoreboardItemComponent],
  exports: [
    CahScoreboardComponent
  ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        MatButtonModule,
        MatTooltipModule
    ]
})
export class CahScoreboardModule {
}
