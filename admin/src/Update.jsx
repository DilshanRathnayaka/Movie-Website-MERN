import React,{useState,useEffect}from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"

function Update() {
    const params = useParams();
    const [moviename, setMoviename] = useState("");
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState("");
    const [release, setRelease] = useState("");
    const [director, setDirector] = useState("");
    const [country, setCountry] = useState("");
    const [image, setImage] = useState("")

  useEffect(() => {
   axios.get(`/api/movies/${params.id}`).then((res)=>{
    setMoviename(res.data.moviename);
    setGenre(res.data.genre);
    setRating(res.data.rating);
    setRelease(res.data.release);
    setDirector(res.data.director);
    setCountry(res.data.country);
    setImage(res.data.image);
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

    axios.patch(`http://localhost:5000/api/movies/${params.id}`, formData).then((res) => { 
        console.log(res)
        window.location.reload();
       
    }).catch((err) => {
        console.log(err);
       
    })
}


  return (
    <div>
          <form className='form' method='POST' encType='multipart/form-data' onSubmit={changeOnClick}>
                <label htmlFor="">moviename</label>
                <input
                    placeholder="moviename"
                    name='moviename'
                    type="text"
                    value={moviename}
                    onChange={(e) => setMoviename(e.target.value)}
                    className="form-control" />
                <label htmlFor="">genre</label>
                <input
                    placeholder="genre"
                    name='genre'
                    value={genre}
                    type="text"
                    onChange={(e) => setGenre(e.target.value)}
                    className="form-control" />
                <label htmlFor="">rating</label>
                <input
                    placeholder="rating"
                    name='rating'
                    value={rating}
                    type="text"
                    onChange={(e) => setRating(e.target.value)}
                    className="form-control" />
                <label htmlFor="">release</label>
                <input
                    placeholder="release"
                    name='release'
                    type="text"
                    value={release}
                    onChange={(e) => setRelease(e.target.value)}
                    className="form-control" />
                <label htmlFor="">director</label>
                <input
                    placeholder="director"
                    name='director'
                    type="text"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    className="form-control" />
                <label htmlFor="">country</label>
                <input
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

       
    </div>
  )
}

export default Update