import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './modules/core.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './modules/shared.module'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ContentModule } from './modules/content.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ContentModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    NgbModule,
  ],
  exports: [RouterModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
