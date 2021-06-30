import React, {useEffect, useState} from "react";
import {Movie} from "../types/movie";
import axios from "axios";
import { Link } from "react-router-dom";

export const Admin = () => {
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
          .catch(err => {
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
      <h2>Manage Catalog</h2>
      <hr/>
      <div className="list-group">
        {
          movies.map(m => (
            <Link key={m.id}
                  to={`/admin/movie/${m.id}`}
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