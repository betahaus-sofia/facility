import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RoomListComponent } from './room-list';
import { SupplyListComponent } from './supply-list';
import { RequestListComponent } from './request-list';
import { TimeagoPipe, TimeagoImpurePipe } from './timeago';

@NgModule({
  declarations: [
    AppComponent,
    RoomListComponent,
    SupplyListComponent,
    RequestListComponent,
    TimeagoPipe,
    TimeagoImpurePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
