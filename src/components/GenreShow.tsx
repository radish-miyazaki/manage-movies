import React, {useEffect, useState} from 'react';
import {Movie} from "../types/movie";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const GenreShow: React.FC<any> = (props) => {
  const {id} = useParams<Record<string, string>>()
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState('')
  const genreName = props.location.state.genreName

  useEffect(() => {
    (
      async () => {
        await axios.get(`/genres/${id}`)
          .then(res => {
            setMovies(res.data.movies)
          })
          .catch((err) => {
            setError(`Invalid response code: ${err.response.status}`)
          })
        setIsLoaded(true)
      }
    )()
  },[id])

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
      <h2>Genre: {genreName}</h2>
      <div className="list-group">
        {
          movies?.map((m) => (
            <Link to={`/movies/${m.id}`} key={m.id} className="list-group-item list-group-item-action">
              {m.title}
            </Link>
          ))
        }
      </div>
    </>
  )
};

export default GenreShow;
