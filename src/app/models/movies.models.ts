export interface IMovie {
  adult?:             boolean;
  backdrop_path?:     string;
  genre_ids?:         number[];
  id?:                number;
  original_language?: string;
  original_title?:    string;
  overview?:          string;
  popularity?:        number;
  poster_path?:       string;
  release_date?:      Date;
  title?:             string;
  video?:             boolean;
  vote_average?:      number;
  vote_count?:        number;
}

export interface IMoviesState {
  movies:        IMovie[];
  genres:        IGenre[];
  moviesPage:    number | null;
  moviesTotal:   number | null;
  moviesGenreId: number | null;
  loading:       boolean;
  loadingEntity: string | number | null;
  errors:        any;
}

export interface IMoviesResponse {
  page?:          number;
  results:       IMovie[];
  total_pages:   number;
  total_results?: number;
}

export interface IGenre {
  id:   number;
  name: string;
}

export interface IGenreListResponse {
  genres: IGenre[];
}
