import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useHistory } from "react-router-dom"
import MovieCard from "./MovieCard"

const Movie = props => {
  const [movie, setMovie] = useState(null)
  const params = useParams()
  const history = useHistory()

  // get movie with a specific id
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response))
  }

  const saveMovie = () => {
    props.addToSavedList(movie)
  }

  // push user to the update movie url with the same id
  const goToEditMovie = () => {
    history.push(`/update-movie/${params.id}`)
  }

  // delete movie and push user to movie list
  const deleteMovie = () => {
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(() => {
        // increase renderCounter to get updated list of movies
        props.setRenderCounter(props.renderCounter + 1)
        // push to movie list home page
        history.push('/')
      })
      .catch(error => alert('Could not delete movie', error))
  }

  // get movie data
  useEffect(() => {
    fetchMovie(params.id)
  }, [params.id])

  if (!movie) {
    return <div>Loading movie information...</div>
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="cardButtonContainer">
        <div className="save-button" onClick={saveMovie}>Save</div>
        <div className="edit-button" onClick={goToEditMovie}>Edit</div>
        <div className="delete-button" onClick={deleteMovie}>Delete</div>
      </div>
    </div>
  )
}

export default Movie
