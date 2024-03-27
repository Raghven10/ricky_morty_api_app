import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CharactersComponent } from './components/characters/characters.component';
import { EpisodesComponent } from './components/episodes/episodes.component';
import { HomeComponent } from './components/home/home.component';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { EpisodeDetailsComponent } from './components/episode-details/episode-details.component';
import { WebsocketComponent } from './components/websocket/websocket.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    EpisodesComponent,
    HomeComponent,
    CharacterDetailsComponent,
    EpisodeDetailsComponent,
    WebsocketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
