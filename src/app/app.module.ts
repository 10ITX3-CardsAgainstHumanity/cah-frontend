import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppModuleRouting} from '@app/app.module.routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {environment} from '@env/environment';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {SocketIoModule} from 'ngx-socket-io';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppModuleRouting,
    BrowserAnimationsModule,
    CoreModule,
    SocketIoModule.forRoot({url: environment.io.url, options: {}}),
    environment.production ? [] : [AkitaNgDevtools.forRoot()]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
