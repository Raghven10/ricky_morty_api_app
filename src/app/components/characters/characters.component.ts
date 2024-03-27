import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  characters: Character[] = []; // Use the interface here
  sortKey: keyof Character = 'name'; 
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  totalPages: number = 0;

  filteredCharacters: Character[] = []; // This will hold the filtered list
  filters = {
    name: '',
    status: '',
    species: ''
  };


 
  constructor(private characterService: CharacterService, private router: Router) { 
   
  }
 
  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.characterService.getCharacters(this.currentPage).subscribe((response: any) => {
      this.characters = [...this.characters, ...response.results];
      this.totalPages = response.info.pages; // the API returns total number of pages in `info.pages`
      this.applyFilters(); 
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // Check if we're not already on the last page
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.loadCharacters();
      }
    }
  }

  sortCharacters(key: keyof Character) {

    if (this.sortKey === key) {
      // Toggle sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortDirection = 'asc';
    }

    this.sortKey = key;
    this.characters.sort((a, b) => {
     
      if (key === 'episode') { // Special handling for episode length comparison
        return a.episode.length - b.episode.length;
      } else {
        // Need to ensure the values are strings to compare them as such
        const aValue = String(a[key]);
        const bValue = String(b[key]);
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return this.sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        return 0;
      }
    });
  }

  applyFilters() {
    this.filteredCharacters = this.characters.filter(character => {
      return (!this.filters.name || character.name.toLowerCase().includes(this.filters.name.toLowerCase())) &&
             (!this.filters.status || character.status === this.filters.status) &&
             (!this.filters.species || character.species.toLowerCase().includes(this.filters.species.toLowerCase()));
    });
  }

  clearFilters() {
    this.filters = {
      name: '',
      status: '',
      species: ''
    };
    this.applyFilters();
  }

  navigateToCharacter(id: number): void {
    this.router.navigate(['/character', id]);
  }
}