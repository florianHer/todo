const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

/**
 * Affichage des utilisateurs
 *
 * @param req
 * @param res
 * @param next
 */
exports.get_all = (req, res, next) => {
    console.log('Affichage des utilisateurs...');
    User.find()
        .select('email')
        .exec()
        .then((results) => {
            const response = {
                count: results.length,
                users: results
            };
            res.status(200).json(response)
        }).catch((err) => {
        res.status(500).json({
            error: err
        })
    })
};

/**
 * Enregistrement d'un nouvel utilisateur
 *
 * @param req
 * @param res
 * @param next
 */
exports.user_signup = (req, res, next) => {
    User.find({email: req.body.email}).then((usersResult) => {
        if (1 <= usersResult.length) {
            res.status(409).json({
                // L'utilisateur existe déjà mais par sécurité on ne le renseigne pas
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) =>{
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                } else {
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save().then((result) => {
                        res.status(201).json({
                            message: 'User created',
                            user: result
                        })
                    }).catch((err) => {
                        res.status(500).json({
                            error: err
                        })
                    })
                }
            });
        }
    }).catch((err) => {
        res.status(500).json({
            error: err
        })
    });
};

/**
 * Connection d'un utilisateur
 *
 * @param req
 * @param res
 * @param next
 */
exports.user_login = (req, res, next) => {
    User.find({email: req.body.email}).then((usersResult) => {
        if (1 !== usersResult.length) {
            res.status(401).json({
                // Il y a 0 ou plus d'un utilisateur qui a cet email
            });
        } else {
            const user = usersResult[0];
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    res.status(401).json({
                        error: err
                    })
                } else {
                    const token = jwt.sign({
                        id: user._id,
                        email: user.email,
                    }, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
                    res.status(200).json({
                        token
                    })
                }
            })
        }
    }).catch();
};