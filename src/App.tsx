import React, {ReactElement, useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Link, Route} from "react-router-dom";
import {Movies} from "./components/Movies";
import {Home} from "./components/Home";
import {Admin} from "./components/Admin";
import MovieShow from "./components/MovieShow";
import Genres from "./components/Genres";
import GenreShow from "./components/GenreShow";
import MovieEdit from "./components/MovieEdit";
import Login from "./components/Login";

const App = () => {
  const [jwt, setJWT] = useState('')
  const [loginLink, setLoginLink] = useState<ReactElement>(null!)

  const handleJWTChange = (jwt: string) => setJWT(jwt)
  const logout = () => setJWT('')

  useEffect(() => {
    if (jwt === '') {
      setLoginLink(<Link to="/login" className="">Login</Link>)
    } else {
      setLoginLink(<Link to="logout" onClick={logout}>Logout</Link>)
    }
  }, [jwt])

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
                  <Link to={'/admin/movie/0'}>Add Movies</Link>
                </li>
                {
                  jwt !== '' && (
                    <>
                      <li className="list-group-item">
                        <Link to={'/genres'}>Genres</Link>
                      </li>
                      <li className="list-group-item">
                        <Link to={'/admin'}>Manage Catalogue</Link>
                      </li>
                    </>
                  )
                }
              </ul>
            </nav>
          </div>

          <div className="col-md-10">
            <Switch>
              <Route
                exact
                path={'/login'}
                component={(props: any) => (
                  <Login {...props} handleJWTChange={handleJWTChange}/>
                )}
              />
              <Route exact path={'/movies'} component={Movies} />
              <Route path={'/movies/:id'} component={MovieShow} />
              <Route exact path={'/genres'} component={Genres} />
              <Route exact path={'/genres/:id'} component={GenreShow} />
              <Route exact path={'/admin/movie/:id'} component={MovieEdit} />
              <Route exact path={'/admin'} component={Admin} />
              <Route exact path={'/'} component={Home} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
