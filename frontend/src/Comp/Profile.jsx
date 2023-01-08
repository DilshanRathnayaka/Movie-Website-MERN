import React, { useEffect, useState } from 'react'
import axios from "axios";
import img1 from "../Images/rm222-mind-16_1.jpg"
import "./CSS/Profile.css"
import { Button } from 'antd';


function Profile() {
    const local = localStorage.getItem('username');
    const [username, setUsername] = useState(local)
    const [list, setList] = useState("")
    const [image, setImage] = useState("");
    const [newlist, setNewlist] = useState([])


    const onChangeImage = (e) => {
        setImage(e.target.files[0]);
    }

    const changeOnClick = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("username", username);
        formData.append("image", image);

        setUsername(local);

        axios.post("http://localhost:5000/api/Login/imagesave", formData).then((res) => {
            window.alert("image saved")

        }).catch((err) => {
            window.alert("cannt save")
        })
    }

    useEffect(() => {
        axios.post("/api/Login/user", {
            username,
        }).then((res) => {
            setList(res.data)

        })
        axios.post("/api/Login/image", {
            username,
        }).then((res) => {
            console.log(res)
            setNewlist(res.data)

        })
    }, [])

    return (
        <div id='profile'>
            <img className='box' src={img1} alt="" ></img>
            <div className='box2'>
                <div className='box3'>
                    <div className='left'>


                        <img className='imagecircle' src={`uploads/${newlist.image}`} alt='' />

                        <form className='form' method='POST' encType='multipart/form-data' onSubmit={changeOnClick}>
                            <div><input type="file"
                                filename="image"
                                className="form-control-file"
                                onChange={onChangeImage}
                            /></div>
                            <div className='upbotton'> <button className='button' type="submit">Upload</button></div>

                        </form>

                    </div>
                    <div className='right'>
                        <p className='profile'> Profile</p>
                        <div className="buttonclas"><Button>Add Payment Method</Button></div>
                        <div className='userdetails'>
                            <div className="username">Username :{list.username}</div>
                            <div className="email">Email :   {list.email}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile