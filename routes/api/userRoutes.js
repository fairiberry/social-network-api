const router = require('express').Router();

const {
    getAllUsers, // returns all users
    getUserById, // returns single user by id
    postUser, // creates new user
    putUserById, // updates user by id
    deleteUserById, // delete a user by id
}=require("../../controllers/userControllers");

// api/users + whatever is in the route function.


router.route("/").get(getAllUsers).post(postUser);

router.route("/:userId").get(getUserById).put(putUserById).delete(deleteUserById);

module.exports = router;