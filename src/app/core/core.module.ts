import {NgModule} from '@angular/core';

import {CoreRoutingModule} from './core-routing.module';
import {CoreRootComponent} from './components/core-root/core-root.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {environment} from '@env/environment';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {CahJoinGameDialogModule} from '@shared/components/cah-join-game-dialog/cah-join-game-dialog.module';
import {CahNewGameDialogModule} from '@shared/components/cah-new-game-dialog/cah-new-game-dialog.module';
import {BrowserModule} from '@angular/platform-browser';
import {CahJoinGameDialogComponent} from '@shared/components/cah-join-game-dialog/cah-join-game-dialog.component';
import {CahNewGameDialogComponent} from '@shared/components/cah-new-game-dialog/cah-new-game-dialog.component';
import {MatSnackBarModule} from '@angular/material';

const ioConfig: SocketIoConfig = {url: environment.io.url, options: {}};

@NgModule({
  declarations: [CoreRootComponent],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    CoreRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    environment.production ? [] : [AkitaNgDevtools.forRoot()],
    SocketIoModule.forRoot(ioConfig),
    CahJoinGameDialogModule,
    CahNewGameDialogModule
  ],
  entryComponents: [CahJoinGameDialogComponent, CahNewGameDialogComponent],
  bootstrap: [CoreRootComponent]
})
export class CoreModule {}
