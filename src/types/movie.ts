export interface Movie {
  id: number;
  title: string;
  description: string;
  year: number;
  release_date: number;
  runtime: number;
  rating: number;
  mpaa_rating: string;
  genres: { [key: number]: string; }
}

export interface Genre {
  id: number;
  genre_name: string
}