const User = require("../models/user");
const Thought = require("../models/thought");

    // getAllThoughts, // returns all thoughts DONE
    // getThoughtById, // returns a single thought by ID DONE
    // postThought, // creates a new thought + pushes the id the user's thoughts array & returns the username + userId as well DONE
    // putThoughtById, // update a thought by ID DONE
    // deleteThoughtById, // delete thought by ID DONE
    // postReaction, // stores a reaction to a single thought's reactions array DONE
    // deleteReactionById // deletes a reaction by ID

module.exports = {

    getAllThoughts(req, res,) {
        Thought.find({})
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId})
        .select("-__v")
        .then((thought) => !thought ? res.status(404).json({ message: "✲´*。.❄¨¯*✲。❄。*。¨¯*✲ no thoughts found!!! ❤"}) : res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    postThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true });
        })
        .then(() => res.json({ message: "✲´*。.❄¨¯*✲。❄。*。¨¯*✲ thought posted!!! ❤" }))
        .catch((err) => res.status(500).json(err));        
    },
    putThoughtById(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    deleteThoughtById(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then(() => {
            User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId }},
                { new: true })
        })
        .then(() => res.json({ message: "✲´*。.❄¨¯*✲。❄。*。¨¯*✲ thought deleted!!! ❤" }))
        .catch((err) => res.status(500).json(err));
    },
    postReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true })
        .then(() => res.json({ message: "✲´*。.❄¨¯*✲。❄。*。¨¯*✲ +1 reaction!!! ❤" }))
        .catch((err) => res.status(500).json(err));
    },
    deleteReactionById(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true })
            .then(() => res.json({ message: "✲´*。.❄¨¯*✲。❄。*。¨¯*✲ -1 reaction!!! ❤" }))
            .catch((err) => res.status(500).json(err));
    }
};