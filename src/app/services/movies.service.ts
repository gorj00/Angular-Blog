import { HttpService } from './http.service'; // service injected imported
import { Injectable, Inject } from '@angular/core'; // Injectable() imported
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMoviesResponse, IGenreListResponse } from '../models/movies.models';

@Injectable()
export class MoviesService {

  paths = {
    genreList: 'genre/movie/list',
    discoverList: 'discover/movie',
  }

  constructor(private http: HttpService) {}

  reqUrl(appendUrl?: string) {
    // Base is injected
    let url: string = ''
    if (appendUrl) (url += appendUrl)
    url += '?api_key=a5357212f9c747dac679fc5ab1aa7ca9'
    return url
  }

  getGenreMoviesList(genreId: number, page: number = 1): Observable<IMoviesResponse> {
    const params = new HttpParams().append('with_genres', genreId)
                                   .append('page', page);
    return this.http.Get(this.reqUrl(this.paths.discoverList), { params })
  }

  getGenreList(): Observable<IGenreListResponse> {
    return this.http.Get(this.reqUrl(this.paths.genreList))
  }

}
