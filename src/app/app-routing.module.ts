import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './components/characters/characters.component';
import { EpisodesComponent } from './components/episodes/episodes.component';
import { HomeComponent } from './components/home/home.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { EpisodeDetailsComponent } from './components/episode-details/episode-details.component';
import { WebsocketComponent } from './components/websocket/websocket.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'character/:id', component: CharacterDetailsComponent },
  { path: 'episodes', component: EpisodesComponent },
  { path: 'episode/:id', component: EpisodeDetailsComponent },
  { path: 'websocket', component: WebsocketComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
