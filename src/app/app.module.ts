import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [CommonModule,BrowserModule, AppRoutingModule, HttpClientModule, HomeModule,],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
