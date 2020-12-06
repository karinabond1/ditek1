import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CountersComponent } from './counters/counters.component';
import { ProductsComponent } from './products/products.component';
import { FactoryComponent } from './factory/factory.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CountersComponent,
    ProductsComponent,
    FactoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
