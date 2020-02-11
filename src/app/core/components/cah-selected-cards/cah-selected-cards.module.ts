import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CahSelectedCardsComponent} from './cah-selected-cards.component';
import {CahBlackCardModule} from '../cah-black-card/cah-black-card.module';
import {CahWhiteCardModule} from '../cah-white-card/cah-white-card.module';

@NgModule({
  declarations: [CahSelectedCardsComponent],
  exports: [CahSelectedCardsComponent],
  imports: [
    CommonModule,
    CahBlackCardModule,
    CahWhiteCardModule
  ]
})
export class CahSelectedCardsModule {
}
