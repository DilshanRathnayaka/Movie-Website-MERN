import {Route,Routes} from "react-router-dom"
import { useState, useEffect } from 'react';
import Footer from "./Comp/Footer";
import Home from "./Comp/Home";
import Login from "./Comp/Login";
import NavBar from "./Comp/NavBar";
import Register from "./Comp/Register";
import Logout from "./Comp/Logout";
import Protected from "./Protected";
import Profile from "./Comp/Profile";
import Movies from "./Comp/Movies";
import Movie from "./Comp/Movie";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const [isnotLoggedIn, setisnotLoggedIn] = useState(false);
  
  const LoginRoute = async () => {
    try {
      const res = await fetch('/api/auth', {
        method : "GET",
        headers : {
          Accept : "application/json",
          "Content-Type" : "application/json"
        },
        credentials : "include"
      });

      if(res.status === 200){
        setisLoggedIn(false)
        setisnotLoggedIn(true)
      }if(res.status ===401){
        setisLoggedIn(true)
        setisnotLoggedIn(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    LoginRoute();
  }, []);


  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home/>}></Route>

        <Route
        path="/Login"
        element={
          <Protected isnotLoggedIn={isnotLoggedIn}>
            <Login />
          </Protected>
        }
      />

<Route
        path="/Register"
        element={
          <Protected isnotLoggedIn={isnotLoggedIn} >
            <Register />
          </Protected>
        }
      />
         <Route
        path="/Logout"
        element={
          <Protected isLoggedIn={isLoggedIn} >
            <Logout />
          </Protected>
        }
      />
      <Route
        path="/Profile"
        element={
          <Protected isLoggedIn={isLoggedIn} >
            <Profile />
          </Protected>
        }
      />

<Route
        path="/Movie"
        element={
          <Protected isLoggedIn={isLoggedIn} >
            <Movie />
          </Protected>
        }
      />
<Route path="/Movies" element={<Movies/>}></Route>
      </Routes>
      <Footer/>
    
    </div>
  );
}

export default App;
