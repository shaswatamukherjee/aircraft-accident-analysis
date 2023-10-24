import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';
import { MapComponent } from './components/map/map.component';
import { YearPickerComponent } from './components/year-picker/year-picker.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    NotificationBarComponent,
    MapComponent,
    YearPickerComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
