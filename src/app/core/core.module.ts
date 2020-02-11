import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SocketIoModule} from 'ngx-socket-io';
import {environment} from '@env/environment';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {MatSnackBarModule} from '@angular/material';
import {CahJoinGameDialogModule} from '@app/core/components/cah-join-game-dialog/cah-join-game-dialog.module';
import {CahNewGameDialogModule} from '@app/core/components/cah-new-game-dialog/cah-new-game-dialog.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatSnackBarModule,
    CahNewGameDialogModule,
    CahJoinGameDialogModule,
    environment.production ? [] : [AkitaNgDevtools.forRoot()],
    SocketIoModule.forRoot({url: environment.io.url, options: {}}),
  ]
})
export class CoreModule {
}
