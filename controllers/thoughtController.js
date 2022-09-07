const {thought,user} = require('../models');

const thoughtController = {
    THOUGHTS(req,res){
        thought.find()
        .select('-__v')
        .then((dbThoughtData) => {
            res.json(dbThoughtData);
        }
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        }
        );
    },
    THOUGHT(req,res){
        thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .populate('reactions')
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
        }
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        }
        );
    },
    ADD_THOUGHT(req,res){
        thought.create(req.body)
        .then((dbThoughtData) => {
            return user.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );
        }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(dbUserData);
        }
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        }
        );
    },
    EDIT_THOUGHT(req,res){
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            {
                $set: req.body,
            },
            {
                runValidators: true,
                new: true,
            }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
        }
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        }
        );
    },
    DELETE_THOUGHT(req,res){
        thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            return user.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
        }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(dbUserData);
        }
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        }
        );
    },
    ADD_REACTION(req,res){
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
        }
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        }
        );
    },
    DELETE_REACTION(req,res){
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
        }
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        }
        );
    },
};

module.exports = thoughtController;