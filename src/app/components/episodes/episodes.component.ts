import { Component, HostListener } from '@angular/core';
import { EpisodeService } from 'src/app/services/episode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent {
   title = 'Episodes';

   episodes: any[] = [];
   currentPage = 1;
   isFetching = false;
 
   constructor(private episodeService: EpisodeService, private router: Router) { }
 
   ngOnInit(): void {
     this.loadEpisodes();
   }
 
   loadEpisodes(): void {
     this.isFetching = true;
     this.episodeService.getEpisodes(this.currentPage).subscribe(data => {
       this.episodes = this.episodes.concat(data.results);
       this.isFetching = false;
     });
   }
 
   @HostListener('window:scroll', ['$event'])
   onScroll(): void {
     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.isFetching) {
       this.currentPage++;
       this.loadEpisodes();
     }
   }

   navigateToEpisode(id: number): void {
    this.router.navigate(['/episode', id]);
  }
}
