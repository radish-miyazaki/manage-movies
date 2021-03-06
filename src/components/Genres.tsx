import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Genre} from "../types/movie";
import { Link } from 'react-router-dom';

const Genres = () => {
  const [genres, setGenres] = useState<Genre[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error ,setError] = useState('')

  useEffect(() => {
    (
      async () => {
        await axios.get('/genres')
          .then(res => {
            setGenres(res.data.genres)
          })
          .catch((err) => {
            setError(`Invalid response code: ${err.response.status}`)
          })
        setIsLoaded(true)
      }
    )()
  },[])

  if (error) {
    return (
      <div>
        Error: {error}
      </div>
    )
  }

  if (!isLoaded) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h2>Genres</h2>

      <div className="list-group">
        {
          genres.map((genre, index) => (
            <Link to={{
              pathname: `/genres/${genre.id}`,
              state: {
                genreName: genre.genre_name
              }
            }} key={index} className="list-group-item list-group-item-action">
              {genre.genre_name}
            </Link>
          ))
        }
      </div>
    </>
  );
};

export default Genres;
