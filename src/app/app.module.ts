import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CahBlackCardModule} from './components/cah-black-card/cah-black-card.module';
import {CahWhiteCardModule} from './components/cah-white-card/cah-white-card.module';
import {CahScoreboardModule} from './components/cah-scoreboard/cah-scoreboard.module';
import { CahPlayerHandComponent } from './components/cah-player-hand/cah-player-hand.component';
import { CahPlayerComponent } from './components/cah-player/cah-player.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CahSelectedCardsComponent } from './components/cah-selected-cards/cah-selected-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    CahPlayerHandComponent,
    CahPlayerComponent,
    CahSelectedCardsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CahBlackCardModule,
    CahWhiteCardModule,
    CahScoreboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
