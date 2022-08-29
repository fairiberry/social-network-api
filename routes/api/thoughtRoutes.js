const router = require('express').Router();

const {
    getAllThoughts, // returns all thoughts
    getThoughtById, // returns a single thought by ID
    postThought, // creates a new thought + pushes the id the user's thoughts array & returns the username + userId as well
    putThoughtById, // update a thought by ID
    deleteThoughtById, // delete thought by ID
}=require("../../controllers/thoughtControllers");

// api/thoughts + whatever is in the route function.


router.route("/").get(getAllThoughts);

router.route("/:thoughtId").get(getThoughtById).put(putThoughtById).delete(deleteThoughtById);

router.route("/:userId/").post(postThought);

module.exports = router;