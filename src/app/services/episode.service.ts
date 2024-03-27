import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { API_URL } from '../app.constants';
import { Episode } from '../models/episode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class EpisodeService {

  // BASE API URI
  private _url: string = API_URL

  constructor(private http: HttpClient) { }

  getEpisodes(page: number = 1): Observable<any> {
    return this.http.get(`${this._url}/episode?page=${page}`);
  }

  getEpisodeById(id: number): Observable<any> {
    return this.http.get(`${this._url}/episode/${id}`);
  }

  getCharactersByIds(ids: string[]): Observable<any> {
    return this.http.get(`${this._url}/character/${ids.join(',')}`);
  }
}
