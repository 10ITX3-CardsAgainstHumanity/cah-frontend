import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: './modules/cah-title-screen/cah-title-screen.module#CahTitleScreenModule'},
  {path: 'room/:id', loadChildren: './modules/cah-game-room/cah-game-room.module#CahGameRoomModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppModuleRouting {
}
