import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { API_URL } from '../app.constants';
import { Observable } from 'rxjs';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})


export class CharacterService {

  // BASE API URI
  private _url: string = API_URL

  constructor(private http: HttpClient) { }

  // getCharacters(): Observable<{results: Character[]}> {
  //   return this.http.get<{results: Character[]}>(this._url+'character');
  // }

  getCharacters(page: number = 1): Observable<any> {
    return this.http.get(`${this._url+'character'}?page=${page}`);
  }

  // Add this method to your RickAndMortyService
getCharacterById(id: string): Observable<any> {
  return this.http.get(`${this._url+'character'}/${id}`);
}

}