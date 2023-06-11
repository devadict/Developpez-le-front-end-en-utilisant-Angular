import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';
import {ChartModule} from "primeng/chart";
import {CardModule} from 'primeng/card';
import { DataTitleComponent } from './core/components/data-title/data-title.component';
import { MedalsInfoComponent } from './core/components/medals-info/medals-info.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, CountryDetailComponent, DataTitleComponent, MedalsInfoComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ChartModule, CardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
