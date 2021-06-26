import React, {useEffect, useState} from 'react';
import {Movie} from "../types/movie";
import {useParams} from "react-router-dom";
import axios from "axios";

const MovieShow: React.FC<any> = (props) => {
  const {id} = useParams<Record<string, string>>()
  const [movie, setMovie] = useState<Movie>({} as Movie)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    (
      async () => {
        await axios.get(`/movies/${id}`)
          .then(res => {
            setMovie(res.data.movie)
          })
          .catch((err) => {
            setError(`Invalid response code: ${err.response.status}`)
          })
        setIsLoaded(true)
      }
    )()
  }, [id])

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
      <h2>Movie: {movie.title} ({movie.year})</h2>

      <div className="float-start">
        <small>Rating: {movie.mpaa_rating}</small>
      </div>

      <div className="float-end">
        {
          Object.keys(movie.genres).map((key, index) => (
            <span className="badge bg-secondary me-1" key={index}>
              {movie.genres[parseInt(key)]}
            </span>
          ))
        }
      </div>

      <div className="clearfix" />

      <hr/>

      <table className="table table-compact table-striped">
        <thead>
        </thead>
        <tbody>
        <tr>
          <td><strong>Title:</strong></td>
          <td>{movie.title}</td>
        </tr>
        <tr>
          <td><strong>Description:</strong></td>
          <td>{movie.description}</td>
        </tr>
        <tr>
          <td><strong>Run Time:</strong></td>
          <td>{movie.runtime}</td>
        </tr>
        </tbody>
      </table>
    </>
  );
};

export default MovieShow
