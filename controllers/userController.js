const { user, thought } = require('../models');

const userController = {
    USERS(req, res) {
        user.find()
            .select('-__v')
            .then((dbUserData) => {
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    USER(req, res) {
        user.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user with this id!' });
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    ADD_USER(req, res) {
        user.create(req.body)
            .then((dbUserData) => {
                res.json(dbUserData);
            }
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            }
            );
    },
    EDIT_USER(req, res) {
        user.findOneAndUpdate(
            { _id: req.params.userId },
            {
                $set: req.body,
            },
            {
                runValidators: true,
                new: true,
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
    DELETE_USER(req, res) {
        user.findOneAndDelete({ _id: req.params.userId })
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
    ADD_FRIEND(req, res) {
        user.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true }
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
    DELETE_FRIEND(req, res) {
        user.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
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
};

module.exports = userController;