import React, {useEffect, useState} from "react";
import {RouteComponentProps} from "react-router-dom";
import {Movie} from "../types/movie";
import axios from "axios";

export const MovieShowGraphQL = (props: RouteComponentProps<{id: string}>) => {
  const [movie, setMovie] = useState<Movie>({} as Movie)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState('')
  const id = props.match.params.id

  useEffect(() => {
    (
      async () => {
        await axios.post('/graphql', `
        {
          movie(id: ${id}) {
            id
            title
            runtime
            year
            description
            release_date
            rating
            mpaa_rating
          }
        }
        `)
          .then(res => {
            console.log(res)
            setMovie(res.data.data.movie)
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
      <h2>Movie: {movie.title} ({movie.year})</h2>

      <div className="float-start">
        <small>Rating: {movie.mpaa_rating}</small>
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
  )
}