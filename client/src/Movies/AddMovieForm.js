import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const addMovieForm = props => {
    const [ formValues, setFormValues ] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: []
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
        // setting state seems to be done in an async way because update is not done before put request, so I created the new variable valuesToSubmit
        // setFormValues({
        //     ...formValues,
        //     metascore: parseInt(formValues.metascore),
        //     stars: formValues.stars.split(',')
        // })
        console.log(valuesToSubmit)
        console.log(formValues)
        axios.put(`http://localhost:5000/api/movies/${params.id}`, 
            valuesToSubmit
        )
            .then(() => {
                props.setRenderCounter(props.renderCounter + 1)
                console.log(formValues)
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
                alert('Was unable to update movie post', error)
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

                <label htmlFor={'stars'}>Stars</label>
                <input name='stars' value={formValues.stars} onChange={updateForm}/>
                <div className='formButtonContainer'>
                    <button className='submitFormButton' onClick={putData}>Submit Put</button>
                </div>
            </form>
        </div>
    )
}

export default addMovieForm