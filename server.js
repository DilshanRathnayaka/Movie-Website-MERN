const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const LoginRoutes = require("./Routes/UserLogin")
const authenticate =require("./middleware/middleware")
const MovieRoutes = require("./Routes/Movies")
dotenv.config();
PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server Is Running On PORT Number ${PORT}`);
})

mongoose.connect(process.env.DB_URL).then((res)=>{
    console.log("DB Connection Success!")
}).catch((err)=>{
    console.log(err);
})

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());

app.use("/api/Login",LoginRoutes);
app.use("/api/movies",MovieRoutes);
app.get('/api/auth', authenticate, (req, res)=>{})