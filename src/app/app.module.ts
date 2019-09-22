import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.component';
import {CahJoinGameDialogComponent} from './shared/components/cah-join-game-dialog/cah-join-game-dialog.component';
import {CahNewGameDialogComponent} from './shared/components/cah-new-game-dialog/cah-new-game-dialog.component';
import {CahJoinGameDialogModule} from './shared/components/cah-join-game-dialog/cah-join-game-dialog.module';
import {CahNewGameDialogModule} from './shared/components/cah-new-game-dialog/cah-new-game-dialog.module';
import {SocketIoModule} from 'ngx-socket-io';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot({ url: 'http://localhost:3000', options: {} }),
    AppRoutingModule,
    CahJoinGameDialogModule,
    CahNewGameDialogModule
  ],
  entryComponents: [CahJoinGameDialogComponent, CahNewGameDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
