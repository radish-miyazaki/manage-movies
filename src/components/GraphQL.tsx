import React, {ChangeEvent, useEffect, useState} from 'react';
import {Movie} from "../types/movie";
import axios from "axios";
import FormInput from "./form/FormInput";
import { Link } from 'react-router-dom';

const GraphQL = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    (
      async () => {
        await axios.post("/graphql", `
        {
          list {
            id
            title
            runtime
            year
            description
          }
        }
        `)
          .then(res => {
            const theList: Movie[] = Object.values(res.data.data.list)
            setMovies(theList)
          })
      }
    )()
  }, [])

  const performSearch = async () => {
    await axios.post("/graphql", `
        {
          search(titleContains: "${searchTerm}") {
            id
            title
            runtime
            year
            description
          }
        }
        `)
      .then(res => {
        const theList: Movie[] = Object.values(res.data.data.search)
        if (theList.length > 0) {
          setMovies(theList)
        } else {
          setMovies([])
        }
      })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value
    setSearchTerm(value)
    performSearch()
  }

  return (
    <>
      <h2>GraphQL</h2>
      <hr />

      <FormInput
        title={"Search"}
        type={"text"}
        name={"search"}
        value={searchTerm}
        handleChange={handleChange}
      />
      <div className="list-group">
        {movies.map((m) => (
          <Link to={`/graphql/movies/${m.id}`} key={m.id} className="list-group-item list-group-item-action">
            <strong>{m.title}</strong><br/>
            <small className="text-muted">
              ({m.year}) - {m.runtime} minutes
            </small>
            <br/>
            {m.description.slice(0, 100)}...
          </Link>
        ))}
      </div>
    </>
  );
};

export default GraphQL;
