export interface Movie {
  id: number;
  title: string;
  description: string;
  year: string;
  release_date: string;
  runtime: number;
  rating: number;
  mpaa_rating: string;
  genres: { [key: number]: string; }
}

export interface Genre {
  id: number;
  genre_name: string
}