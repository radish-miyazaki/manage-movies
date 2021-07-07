import React, {ReactElement, useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Link, Route, RouteComponentProps} from "react-router-dom";
import {Movies} from "./components/Movies";
import {Home} from "./components/Home";
import {Admin} from "./components/Admin";
import MovieShow from "./components/MovieShow";
import Genres from "./components/Genres";
import GenreShow from "./components/GenreShow";
import MovieEdit from "./components/MovieEdit";
import Login from "./components/Login";
import GraphQL from "./components/GraphQL";
import {MovieShowGraphQL} from "./components/MovieShowGraphQL";

const App = () => {
  let tokenStr = window.localStorage.getItem("jwt")
  const [token, setToken] = useState<string>(tokenStr ? tokenStr : '')
  const [loginLink, setLoginLink] = useState<ReactElement>(null!)

  const logout = () => {
    window.localStorage.removeItem("jwt")
    setToken('')
  }

  useEffect(() => {
    if (token === '') {
      setLoginLink(<Link to="/login">Login</Link>)
    } else {
      setLoginLink(<Link to="logout" onClick={logout}>Logout</Link>)
    }
  }, [token])

  return (
    <Router>
      <div className="container">
        <div className="row">
          <div className="col mt-3">
            <h1 className="mt-3">
              Go Watch a Movie!
            </h1>
          </div>
          <div className="col mt-3 text-end">
            {loginLink}
          </div>
          <hr className="mb-3" />
        </div>

        <div className="row">
          <div className="col-md-2">
            <nav>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link to={'/'}>Home</Link>
                </li>
                <li className="list-group-item">
                  <Link to={'/movies'}>Movies</Link>
                </li>
                <li className="list-group-item">
                  <Link to={'/genres'}>Genres</Link>
                </li>
                {
                  token !== '' && (
                    <>
                      <li className="list-group-item">
                        <Link to={'/admin/movie/0'}>Add Movies</Link>
                      </li>
                      <li className="list-group-item">
                        <Link to={'/admin'}>Manage Catalogue</Link>
                      </li>
                    </>
                  )
                }
                <li className="list-group-item">
                  <Link to="/graphql">
                    GraphQL
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-md-10">
            <Switch>
              <Route
                exact
                path={'/login'}
                component={() => <Login setToken={setToken} />}
              />
              <Route exact path={'/movies'} component={Movies} />
              <Route path={'/movies/:id'} component={MovieShow} />
              <Route exact path={'/genres'} component={Genres} />
              <Route exact path={'/genres/:id'} component={GenreShow} />
              <Route
                exact
                path={'/admin/movie/:id'}
                component={(props: {token: string} & RouteComponentProps<{id: string}>) => (
                  <MovieEdit {...props} token={token} />
                )}
              />
              <Route
                exact
                path={'/admin'}
                component={() => <Admin token={token} />}
              />
              <Route exact path={'/'} component={Home} />
              <Route exact path={'/graphql'} component={GraphQL} />
              <Route path={'/graphql/movies/:id'} component={MovieShowGraphQL} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
