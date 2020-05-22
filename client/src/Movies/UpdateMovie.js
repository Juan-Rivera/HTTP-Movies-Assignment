import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Movie from './Movie';


const initialMovie = {
    title: '',
    director: '',
    metascore: '',
}


const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data);
            })
    }, [id])

    const handleChange = e => {
        setMovie({...movie, [e.target.name]: e.target.value,})
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                console.log(res.data)
                props.getMovieList(res.data)
                push(`/movies/${id}`);
            })
    }

    return(
        
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input 
                    type='text'
                    name='title'
                    onChange={handleChange}
                    value={movie.title}
                />
            </label>
            <label>
                Director: 
                <input 
                    type='text'
                    name='director'
                    onChange={handleChange}
                    value={movie.director}
                />
            </label>
            <label>
                Metascore:
                <input 
                    type='text'
                    name='metascore'
                    onChange={handleChange}
                    value={movie.metascore}
                />
            </label>
            <button>Update!</button>
        </form>
    )
}
export default UpdateMovie;