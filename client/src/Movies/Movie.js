import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useHistory } from "react-router-dom"
import MovieCard from "./MovieCard"

const Movie = ({addToSavedList}) => {
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
    addToSavedList(movie)
  }

  // push user to the update movie url with the same id
  const goToEditMovie = () => {
    history.push(`/update-movie/${params.id}`)
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
      <div className="save-button" onClick={saveMovie}>Save</div>
      <div className="edit-button" onClick={goToEditMovie}>Edit</div>
    </div>
  )
}

export default Movie
