const router = require("express").Router();
const Movies = require("../Models/Movies");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './frontend/public/uploads/');
        cb(null, './admin/public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });


router.post("/", upload.single("movieimage"), async (req, res) => {
    const movie = new Movies({
        moviename: req.body.moviename,
        genre: req.body.genre,
        rating: req.body.rating,
        release: req.body.release,
        director: req.body.director,
        country: req.body.country,
        image: req.file.originalname
    })
    try {
        const saved = await movie.save();
        res.status(200).json(saved);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.get("/", async (req, res) => {
    try {
        const getmovies = await Movies.find();
        res.status(200).json(getmovies);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const deletemovie = await Movies.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted")
    } catch (err) {
        res.status(400).json(err);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const find = await Movies.findById(req.params.id);
        res.status(200).json(find)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.patch("/:id",upload.single("movieimage"), async (req, res) => {
    try {
      
        const items = await Movies.findByIdAndUpdate(
            req.params.id,
            {
            moviename: req.body.moviename,
            genre: req.body.genre,
            rating: req.body.rating,
            release: req.body.release,
            director: req.body.director,
            country: req.body.country,
            image: req.file.originalname
        })
        await items.save();
        res.status(200).json(items);

    } catch (err) {
        res.status(400).json(err);
    }   

})





module.exports = router;