import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {Movie} from "../types/movie";
import axios from "axios";

export const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    (
      async () => {
        await axios.get('/movies')
          .then(res => {
            setMovies(res.data.movies)
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

  return  (
    <>
      <h2>Choose a movie</h2>
      <div className="list-group">
        {
          movies.map((m) => (
            <Link
              to={`/movies/${m.id}`}
              key={m.id}
              className="list-group-item list-group-item-action"
            >
              {m.title}
            </Link>
          ))
        }
      </div>
    </>
  )
}