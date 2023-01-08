const router = require("express").Router();
const UserLogin = require("../Models/UserLogin");
const bcryptjs = require("bcryptjs");
const multer = require("multer");
const Image = require("../Models/image")



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './frontend/public/uploads/');
    },
    filename: function(req, file, cb) {   
        cb(null,file.originalname);
    }
});
const upload = multer({ storage: storage });

//REGISTER
router.post('/register',async(req,res)=>{
    const files = new UserLogin({
        email: req.body.email,
        username :req.body.username,
        password: req.body.password,
    })
    try{
        const saved = await files.save();
        res.status(200).json(saved);
    }catch(err){
        res.status(400).json(err);
    }
    
})
    


//LOGIN

router.post("/login",async(req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;

        const user = await UserLogin.findOne({username:username});
        if(user){
            const isMatch = await bcryptjs.compare(password,user.password);

            if(isMatch){
                const token = await user.generateToken();
                res.cookie("jwt",token,{
                    expires :new Date(Date.now()+86400000),
                    httpOnly:true
                })
                res.status(200).json("User Logged in");
            }else{
                res.status(401).json("Invalid Credentials");
            }
        }
    }catch(err){
        res.status(500).json(err);
    }
})

//LOGOUT
router.get('/logout',(req,res)=>{
    res.clearCookie("jwt",{path:'/'})
    res.status(200).json("userLogged Out")
})

//Check username details
router.post("/user",async(req,res)=>{
    try{
        const username = req.body.username;
       
        const user = await UserLogin.findOne({username:username})
        if(user){
            res.status(200).json(user)
        }
    }catch(err){
        res.status(400).json(err)
    }
})

router.post("/image",async(req,res)=>{
    try{
        const username = req.body.username;
       
        const user = await Image.findOne({username:username})
        if(user){
            res.status(200).json(user)
        }
    }catch(err){
        res.status(400).json(err)
    }
})

router.post("/imagesave",upload.single("image"),async(req,res)=>{
    const files = new Image({
        username: req.body.username,
        image:req.file.originalname,
    })
    try{
        const saved = await files.save();
        res.status(200).json(saved);
    }catch(err){
        res.status(400).json(err);
    }
    
})

module.exports = router;