import React from 'react'
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

function Logout() {

    const navigate = useNavigate();

    const logout = async ()=>{
        try{
            const res = await fetch('/api/Login/logout',{
                method :"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });
            if(res.status === 401||!res){
                window.alert("Cant LOg out")
            }else{
                navigate('/')
                window.location.reload();
                localStorage.clear();
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        logout();
    }, [])

  return (
    <div>Logout</div>
  )
}

export default Logout