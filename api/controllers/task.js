const mongoose = require('mongoose');
const Task = require('../models/task.model');
const User = require('../models/user.model');
const auth = require('../middleware/auth');

/**
 * TODO
 * Récupère toutes les taches
 *
 * @param req
 * @param res
 * @param next
 */
exports.get_all = (req, res, next) => {
    console.log('Affichage des tâches...');
    Task.find()
        .select('_id userId name info create_date')
        .exec()
        .then((results) => {
            const response = {
                count: results.length,
                posts: results.map(task => {
                    return {
                        task,
                        detail: {
                            type: 'GET',
                            url: 'http://localhost:3000/task/' + task._id
                        }
                    }
                })
            };
            res.status(200).json(response)
        }).catch((err) => {
        res.status(500).json({
            error: err
        })
    })
};

/**
 * TODO
 *
 * @param req
 * @param res
 * @param next
 */
exports.get_task = (req, res, next) => {
    const id = req.params.taskId;
    Task.findById(id).then((result) => {
        res.status(200).json({
            message: 'Affichage de la tâche',
            task: result
        })
    }).catch((err) => {
        res.status(500).json({
            error: err
        })
    })
};

/**
 * Ajoute une tache à un user
 *
 * @param req
 * @param res
 * @param next
 */
exports.add_task = (req, res, next) => {
    User.find({email: req.body.userEmail}).then(userResults => {
        if (1 < userResults.length) {
            res.status(404).json({
                message: "Plusieurs utilisateurs correspondent à cet email..."
            })
        }
        console.log(userResults[0]);
        const task = new Task({
            _id: mongoose.Types.ObjectId(),
            userId: userResults[0]._id,
            name: req.body.taskName,
            info: req.body.taskInfo,
        });
        return task.save();
    }).then(taskResult => {
        res.status(201).json({
            message: 'Nouvelle tâche créée avec succès...',
            task: taskResult
        })
    }).catch((err) => {
        console.log('erreur ici');
        res.status(500).json({
            error: err
        })
    })
};

/**
 * Mettre à jour une tache (l'utilisateur de la tache en question doit etre connecté et fournir son token dans le header)
 *
 * @param req
 * @param res
 * @param next
 */
exports.update_task = (req, res, next) => {
    const id = req.params.taskId;
    const updateObj = {};
    const reqBody = req.body;
    for (let key in reqBody) {
        updateObj[key] = reqBody[key]
    }
    Task.update({_id: id}, { $set: updateObj}).then((result) => {
        res.status(200).json({
            message: 'Modification d\'un post',
            task: result
        })
    }).catch((err) => {
        res.status(500).json({
            error: err
        })
    })
};

/**
 * Suppression d'une tache (L'utilisateur de la tache en question doit etre connecté et fournir son token d'authentification)
 *
 * @param req
 * @param res
 * @param next
 */
exports.remove_task = (req, res, next) => {
    const id = req.params.postId;
    Task.remove({_id: id}).then((result) => {
        res.status(200).json({
            message: 'Suppression d\'un post',
            post: result
        })
    }).catch((err) => {
        res.status(500).json({
            error: err
        })
    })
};