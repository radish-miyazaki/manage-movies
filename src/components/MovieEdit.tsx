import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';
import {Movie} from "../types/movie";
import './MovieEdit.css'
import FormInput from "./form/FormInput";
import FormTextarea from "./form/FormTextarea";
import FormSelect, {FormSelectOption} from "./form/FormSelect";
import axios from "axios";
import {Link, RouteComponentProps, useHistory } from 'react-router-dom';
import Alert, {AlertProps} from "./ui/Alert";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const initMovieState: Movie = {
  id: 0,
  title: '',
  release_date: '',
  runtime: 0,
  year: '',
  mpaa_rating: '',
  rating: 0,
  description: '',
  genres: {},
}

const formSelectOptions: FormSelectOption[] = [
  {id: "R", value: "R"},
  {id: "G", value: "G"},
  {id: "PG", value: "PG"},
  {id: "PG13", value: "PG13"},
  {id: "NC17", value: "NC17"},
]

type PageProps = {} & RouteComponentProps<{id: string}>;

const MovieEdit: React.FC<PageProps> = (props) => {
  const [movie, setMovie] = useState<Movie>(initMovieState)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState('')
  const [errorFields, setErrorFields] = useState<string[]>([])
  const [alert, setAlert] = useState<AlertProps>({alertType: "d-none", message: ""})
  const id = Number(props.match.params.id)
  const history = useHistory()

  useEffect(() => {
    if (id !== 0) {
      (
        async () => {
          await axios.get(`/movies/${id}`)
            .then(res => {
              // Format
              res.data.movie.release_date = res.data.movie.release_date.split('T')[0]
              setMovie(res.data.movie)
            })
            .catch((err) => {
              setError(`Invalid response code: ${err.response.status}`)
            })
        }
      )()
    } else {
      setMovie(initMovieState)
    }
    setIsLoaded(true)
  }, [id])

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    // client side validation
    let errors: string[] = []

    if (movie.title === '') {
      errors.push('title')
    }

    setErrorFields(errors)

    if (errors.length > 0) {
      return false
    }

    await axios.post('/admin/movie/edit', {
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      runtime: movie.runtime,
      mpaa_rating: movie.mpaa_rating,
      rating: movie.rating,
      description: movie.description,
    })
      .then(() => {
        history.push({pathname: "/admin"})
      })
      .catch(err => {
        setAlert({alertType: "alert-danger", message: err.response.data.errors.message})
      })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value.match(/^[0-9]+$/) ? Number(e.target.value) : e.target.value
    setMovie({
      ...movie,
      [name]: value
    })
  }

  const confirmDelete = (e: SyntheticEvent) => {
    e.preventDefault()
    confirmAlert({
      title: 'Delete Movie',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            await axios.delete(`/admin/movie/delete/${movie.id}`)
              .then(() => {
                history.push({pathname: "/admin"})
              })
              .catch(err => {
                setAlert({alertType: "alert-danger", message: err.response.data.errors.message})
              })
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  }

  const hasError = (key: string) => {
    return errorFields.indexOf(key) !== -1;
  }

  if (error) {
    return (
      <div>
        Error: {error}
      </div>
    )
  } else if (!isLoaded) {
    return <p>Loading...</p>
  } else {
    return (
      <>
        <h2>Add/Edit Movie</h2>
        <Alert alertType={alert.alertType} message={alert.message} />
        <hr/>

        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" id="id" value={movie.id} />
          <FormInput
            name="title"
            title="Title"
            value={movie.title}
            handleChange={handleChange}
            type="text"
            className={hasError("title") ? "is-invalid" : ""}
            errorDiv={hasError("title") ? "text-danger" : "d-none"}
            errorMessage="Please enter a title"
          />

          <FormInput
            name="release_date"
            title="Release Date"
            value={movie.release_date}
            handleChange={handleChange}
            type="date"
          />

          <FormInput
            name="runtime"
            title="Runtime"
            value={movie.runtime}
            handleChange={handleChange}
            type="number"
          />

          <FormSelect
            name="mpaa_rating"
            title="MPAA Rating"
            value={movie.mpaa_rating}
            handleChange={handleChange}
            placeholder="Choose..."
            options={formSelectOptions}
          />

          <FormInput
            name="rating"
            title="Rating"
            value={movie.rating}
            handleChange={handleChange}
            type="number"
          />

          <FormTextarea
            name="description"
            title="Description"
            value={movie.description}
            handleChange={handleChange}
            rows={3}
          />

          <hr/>

          <button className="btn btn-primary">Save</button>
          <Link to="/admin" className="btn btn-warning ms-1">
            Cancel
          </Link>
          {movie.id !== 0 && (
            <button className="btn btn-danger ms-1" onClick={confirmDelete}>
              Delete
            </button>
          )}
        </form>
      </>
    );
  }
};

export default MovieEdit;
