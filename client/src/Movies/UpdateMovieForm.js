import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const UpdateMovieForm = props => {
    const [ formValues, setFormValues ] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: []
    })

    // will add to our url to target our put request
    const params = useParams()

    // will use to push user to movie list after 
    const history = useHistory()

    // update form with our changes
    const updateForm = event => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    }

    // get data to populate the form with
    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${params.id}`)
        .then(response => {
            console.log(response.data)
            // stars is an array and metascore is a number, so lets turn them into a string
            const formattedData = {
                ...response.data,
                metascore: response.data.metascore.toString(),
                stars: response.data.stars.toString()
            }
            setFormValues(formattedData)
        })
        .catch(error => {
            alert('Could not receive data for this movie', error);
        })
    }, [params.id]);

    const putData = event => {
        event.preventDefault()
        console.log(formValues)
        
        // turn stars back into array and metascore into number
        const valuesToSubmit = {
            ...formValues,
            metascore: parseInt(formValues.metascore),
            stars: formValues.stars.split(',')
        }
        // console.log(valuesToSubmit)
        // console.log(formValues)
        axios.put(`http://localhost:5000/api/movies/${params.id}`, 
            valuesToSubmit
        )
            .then(() => {
                props.setRenderCounter(props.renderCounter + 1)
                console.log(formValues)
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
        <form>
            <label>Title</label>
            <input id='title' name='title' value={formValues.title} onChange={updateForm}/>

            <label>Director</label>
            <input id='director' name='director' value={formValues.director} onChange={updateForm}/>

            <label>Metascore</label>
            <input name='metascore' value={formValues.metascore} onChange={updateForm}/>

            <label>Stars</label>
            <input name='stars' value={formValues.stars} onChange={updateForm}/>

            <button className='submitPutButton' onClick={putData}>Submit Put</button>
        </form>
    )
}

export default UpdateMovieForm