import React, { useState, useEffect } from 'react'
import { Card } from 'antd';
import axios from "axios"
import { StarFilled } from '@ant-design/icons';
import { Input } from 'antd';
import "./CSS/Movies.css"
const { Meta } = Card;

function Movies() {
  const [movielist, setMovielist] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");


  useEffect(() => {
    axios.get('/api/movies').then((res) => {
      setMovielist(res.data);
    })
  }, [])

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
    <div id='movies'>
      <div className='searchbar'>
        <div className='search'><Input type="search" placeholder='Search' onChange={(e) => searchItems(e.target.value)} name="searchitem" /></div>
        <div className='searchlist'>
          <ul className='searchlist'>
            <li className='genre'> <a href="">Action</a> </li>
            <li className='genre'> <a href="">Adventure</a> </li>
            <li className='genre'> <a href="">Animation</a> </li>
            <li className='genre'> <a href="">comedy</a> </li>
          </ul>
        </div>
      </div>


      <div className='Card'>
        {searchInput.length > 1 ? filteredResults.map((data) => {
          return (
            <a className='movieroute' href={`/Movie/${data._id}`}>
              <Card
                className='card1'
                hoverable
                cover={<img className='cardimage' alt="example" src={`uploads/${data.image}`} />}
              ><div > <div className="title">{data.moviename} </div>
                  <div className='meta'>
                    <div>Year : {data.release}</div>
                    <div className="rating"><StarFilled /> {data.rating}</div>
                  </div>

                </div>

              </Card>
            </a>

          )
        }) :
          movielist.map((data) => {
            return (
              <a className='movieroute' href={`/Movie/${data._id}`}>
                <Card
                  className='card1'
                  hoverable
                  cover={<img className='cardimage' alt="example" src={`uploads/${data.image}`} />}
                ><div > <div className="title">{data.moviename} </div>
                    <div className='meta'>
                      <div>Year : {data.release}</div>
                      <div className="rating"><StarFilled /> {data.rating}</div>
                    </div>

                  </div>

                </Card>
              </a>

            )
          })}
      </div>
    </div>
  )
}

export default Movies