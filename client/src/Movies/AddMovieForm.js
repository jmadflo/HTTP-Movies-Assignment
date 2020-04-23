import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const AddMovieForm = props => {
    const [ formValues, setFormValues ] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: ''
    })

    // will use to push user to movie list after 
    const history = useHistory()

    // update form with our changes
    const updateForm = event => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    }

    const postData = event => {
        event.preventDefault()
        console.log(formValues)
        
        // turn stars back into array and metascore into number
        const valuesToSubmit = {
            ...formValues,
            metascore: parseInt(formValues.metascore),
            stars: formValues.stars.split(',')
        }
        console.log(valuesToSubmit)
        axios.post(`http://localhost:5000/api/movies/`, valuesToSubmit)
            .then(() => {
                //add to renderCounter to get updated movielist
                props.setRenderCounter(props.renderCounter + 1)
                // reset form values after done editing
                setFormValues({
                    title: '',
                    director: '',
                    metascore: '',
                    stars: []
                })
                // push user to movie list
                history.push('/')
            })
            .catch(error => {
                alert('Was unable to post movie', error)
            })
    }

    return (
        <div className="formContainer">
            <form>
                <label htmlFor={'title'}>Title</label>
                <input id='title' name='title' value={formValues.title} onChange={updateForm}/>

                <label htmlFor={'director'}>Director</label>
                <input id='director' name='director' value={formValues.director} onChange={updateForm}/>

                <label htmlFor={'metascore'}>Metascore</label>
                <input name='metascore' value={formValues.metascore} onChange={updateForm}/>

                <label htmlFor={'stars'}>Stars (in a comma separated list)</label>
                <input name='stars' value={formValues.stars} onChange={updateForm}/>
                <div className='formButtonContainer'>
                    <button className='submitFormButton' onClick={postData}>Post Movie</button>
                </div>
            </form>
        </div>
    )
}

export default AddMovieForm