const User = require("../models/user");
const Thought = require("../models/thought");

    // getAllUsers, // returns all users DONE
    // getUserById, // returns single user by id DONE
    // postUser, // creates new user DONE
    // putUserById, // updates user by id DONE
    // deleteUserById, // delete a user by id
    // postNewFriend, // add new friend to user's friend list
    // deleteFriend, // delete friend from user's friend list

module.exports = {
    getAllUsers(req, res) {
        User.find({})
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
        .select("-__v")
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    postUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    putUserById(req, res) {
        User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    deleteUserById(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then(() => {
            User.findOneAndUpdate(
                { thoughts: req.params.userId },
                { $pull: { user: req.params.userId }},
                { new: true })
        })
        .then(() => res.json({ message: "✲´*。.❄¨¯*✲。❄。*。¨¯*✲ user deleted!!! ❤" }))
        .catch((err) => res.status(500).json(err));
    },    
}


