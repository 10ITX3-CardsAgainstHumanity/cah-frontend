import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CahTitleScreenComponent} from './cah-title-screen.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '', component: CahTitleScreenComponent
  }
];

@NgModule({
  declarations: [CahTitleScreenComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CahTitleScreenModule {
}
