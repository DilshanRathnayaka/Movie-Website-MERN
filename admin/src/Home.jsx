import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Input } from 'antd';




function Home() {
    const [moviename, setMoviename] = useState("");
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState("");
    const [release, setRelease] = useState("");
    const [director, setDirector] = useState("");
    const [country, setCountry] = useState("");
    const [image, setImage] = useState("")
    const [movielist, setMovielist] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");


    useEffect(() => {
        axios.get('/api/movies').then((res) => {
            setMovielist(res.data)
            console.log(movielist)
        })
    }, [])


    const onChangeImage = (e) => {
        setImage(e.target.files[0]);
    }

    const changeOnClick = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("moviename", moviename);
        formData.append("genre", genre);
        formData.append("rating", rating);
        formData.append("release", release);
        formData.append("director", director);
        formData.append("country", country);
        formData.append("movieimage", image);

        setMoviename("");
        setGenre("");
        setRating("");
        setRelease("");
        setDirector("");
        setCountry("");

        axios.post("/api/movies", formData).then((res) => {
            console.log(res)
            setMovielist([...movielist, {
                moviename,
                genre,
                rating,
                release,
                director,
                country
            }])
        }).catch((err) => {
            console.log(err);

        })
    }

    const DeleteMovie = (id) => {
        axios.delete(`/api/movies/${id}`).then((res) => {
            window.location.reload();
        })
    }

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if (searchInput !== "") {
            const filteredData = movielist.filter((list) => {
                return Object.values(list.moviename)
                    .join("")
                    .toLowerCase()
                    .includes(searchInput.toLowerCase());
            });
            console.log(filteredData);
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(movielist);
        }
    };

    return (
        <div id='home'>
            <div className="left">
                <a className='image' href="index.html">
                    <svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" class="ccompli1" fill="#007AFF"></path> <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" class="ccustom" fill="#312ECB"></path> </svg>
                </a>
                <p className='p'>Admin Dashboard</p>
            </div>


            <div className='right'>
                ADD NEW Movie
                <form className='form' method='POST' encType='multipart/form-data' onSubmit={changeOnClick}>
                    <label htmlFor="">moviename</label>
                    <Input
                        placeholder="moviename"
                        name='moviename'
                        type="text"
                        value={moviename}
                        onChange={(e) => setMoviename(e.target.value)}
                        className="form-control" />
                    <label htmlFor="">genre</label>
                    <Input
                        placeholder="genre"
                        name='genre'
                        value={genre}
                        type="text"
                        onChange={(e) => setGenre(e.target.value)}
                        className="form-control" />
                    <label htmlFor="">rating</label>
                    <Input
                        placeholder="rating"
                        name='rating'
                        value={rating}
                        type="text"
                        onChange={(e) => setRating(e.target.value)}
                        className="form-control" />
                    <label htmlFor="">release</label>
                    <Input
                        placeholder="release"
                        name='release'
                        type="text"
                        value={release}
                        onChange={(e) => setRelease(e.target.value)}
                        className="form-control" />
                    <label htmlFor="">director</label>
                    <Input
                        placeholder="director"
                        name='director'
                        type="text"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                        className="form-control" />
                    <label htmlFor="">country</label>
                    <Input
                        placeholder="country"
                        name='country'
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="form-control" />
                    <input type="file"
                        filename="movieimage"
                        className="form-control-file"
                        onChange={onChangeImage}
                    />
                    <button className='button' type="submit">List Movie</button>
                </form>
                <input className='search' type="search" placeholder='Search' onChange={(e) => searchItems(e.target.value)} name="searchitem" />
                <div className='cards'>
                    {searchInput.length > 1 ? filteredResults.map((movies) => {
                        return (
                            <div className='card'>
                                <img src={`uploads/${movies.image}`} className="image" alt='' />
                                <div>{movies.moviename}</div>
                                <div>{movies.genre}</div>
                                <div>{movies.rating}</div>
                                <div>{movies.release}</div>
                                <div>{movies.director}</div>
                                <div>{movies.country}</div>
                                <a href={`/Update/${movies._id}`}><button>Update</button></a>
                                <button onClick={() => DeleteMovie(movies._id)}> Delete</button>

                            </div>
                        )
                    }) :
                        movielist.map((movies) => {
                            return (

                                <div className='card'>
                                    <img src={`uploads/${movies.image}`} className="image" alt='' />
                                    <div>{movies.moviename}</div>
                                    <div>{movies.genre}</div>
                                    <div>{movies.rating}</div>
                                    <div>{movies.release}</div>
                                    <div>{movies.director}</div>
                                    <div>{movies.country}</div>
                                    <a href={`/Update/${movies._id}`}><button>Update</button></a>
                                    <button onClick={() => DeleteMovie(movies._id)}> Delete</button>

                                </div>
                            )
                        })}
                </div>
            </div>


        </div>
    )
}

export default Home