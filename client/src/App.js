import React, { useState, useEffect } from "react"
import { Route, Switch } from "react-router-dom"
import axios from 'axios'
import SavedList from "./Movies/SavedList"
import MovieList from "./Movies/MovieList"
import Movie from "./Movies/Movie"
import UpdateMovieForm from './Movies/UpdateMovieForm'

const App = () => {
  const [savedList, setSavedList] = useState([])
  const [movieList, setMovieList] = useState([])
  // will increase this by one every time a change is made to, so that MovieList gets updated data
  const [renderCounter, setRenderCounter] = useState(0)

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response))
  }

  const addToSavedList = movie => {
    setSavedList([...savedList, movie])
  }

  useEffect(() => {
    getMovieList()
  }, [renderCounter])

  return (
    <>
      <SavedList list={savedList} />
      <Switch>
        <Route exact path="/">
          <MovieList movies={movieList} />
        </Route>

        <Route path="/movies/:id">
          <Movie addToSavedList={addToSavedList} />
        </Route>

        <Route path="/update-movie/:id">
          <UpdateMovieForm renderCounter={renderCounter} setRenderCounter={setRenderCounter}/>
        </Route>
      </Switch>
    </>
  )
}

export default App
