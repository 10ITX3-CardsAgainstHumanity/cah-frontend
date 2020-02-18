import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatSnackBarModule} from '@angular/material';
import {CahJoinGameDialogModule} from '@app/core/components/cah-join-game-dialog/cah-join-game-dialog.module';
import {CahNewGameDialogModule} from '@app/core/components/cah-new-game-dialog/cah-new-game-dialog.module';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    FontAwesomeModule,
    MatSnackBarModule,
    CahNewGameDialogModule,
    CahJoinGameDialogModule,
  ]
})
export class CoreModule {
}
