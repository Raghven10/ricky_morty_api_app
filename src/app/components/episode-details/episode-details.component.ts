import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EpisodeService } from 'src/app/services/episode.service';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.css']
})
export class EpisodeDetailsComponent implements OnInit {
  episode: any;
  characters: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private episodeService: EpisodeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.episodeService.getEpisodeById(id).subscribe(episode => {
        this.episode = episode;
        const characterIds = episode.characters.map((url: string) => url.split('/').pop());
        this.episodeService.getCharactersByIds(characterIds).subscribe(characters => {
          this.characters = characters;
        });
      });
    });
  }

  navigateToCharacter(id: number): void {
    this.router.navigate(['/character', id]);
  }

  printPage() {
    window.print();
  }
  
}
