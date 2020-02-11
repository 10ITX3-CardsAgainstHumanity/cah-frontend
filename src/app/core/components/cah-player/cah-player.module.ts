import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CahPlayerComponent} from './cah-player.component';
import {CahPlayerHandModule} from '../cah-player-hand/cah-player-hand.module';

@NgModule({
  declarations: [CahPlayerComponent],
  exports: [CahPlayerComponent],
  imports: [
    CommonModule,
    CahPlayerHandModule
  ]
})
export class CahPlayerModule {
}
