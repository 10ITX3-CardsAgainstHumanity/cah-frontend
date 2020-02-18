import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./modules/cah-title-screen/cah-title-screen.module').then(m => m.CahTitleScreenModule)},
  {path: 'room/:id', loadChildren: () => import('./modules/cah-game-room/cah-game-room.module').then(m => m.CahGameRoomModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppModuleRouting {
}
