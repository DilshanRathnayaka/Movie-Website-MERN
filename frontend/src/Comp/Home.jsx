import React, { useState, useEffect } from 'react'
import { Card } from 'antd';
import axios from "axios"
import { Carousel } from 'antd';
import img1 from "../Images/7041856-walter-white.jpg"
import img2 from "../Images/7041798.jpg"
import img3 from "../Images/7038019-the-witcher-3-wild-hunt.jpg"
import img4 from "../Images/7037036-time-of-the-doctor.jpg"
import "./CSS/Home.css";
import { StarFilled } from '@ant-design/icons';
const { Meta } = Card;

function Home() {
  const [list, setList] = useState([])



  useEffect(() => {
    axios.get('/api/movies').then((res) => {
      setList(res.data)
      console.log(list)
    })
  }, [])



  return (
    <div id='home'>
      <Carousel autoplay className='Carousel'>
        <div  >
          <img className='img1' src={img1} alt="" />
        </div>
        <div>
          <img className='img1' src={img2} alt="" />
        </div>
        <div>
          <img className='img1' src={img3} alt="" />
        </div>
        <div>
          <img className='img1' src={img4} alt="" />
        </div>
      </Carousel>




      <div className='Card'>
        {list.map((data) => {
          return (
            <a className='movieroute' href={`/Movie/${data._id}`}>
              <Card
                className='card1'
                hoverable
                cover={<img className='cardimage' alt="example" src={`uploads/${data.image}`} />}
              ><div className='cardcontainer'> <div className="title">{data.moviename} </div>
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

export default Home