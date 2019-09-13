import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CahPlayerHandComponent} from './cah-player-hand.component';
import {CahWhiteCardModule} from '../cah-white-card/cah-white-card.module';

@NgModule({
  declarations: [CahPlayerHandComponent],
  exports: [CahPlayerHandComponent],
  imports: [
    CommonModule,
    CahWhiteCardModule
  ]
})
export class CahPlayerHandModule { }
