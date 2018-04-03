/*
*
* TASK
*   POST / GET / DELETE / PATCH
*
* USER (email, password)
*   POST
*   (auth / token)
*
*/

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const taskRoutes = require('./api/routes/task');
const userRoutes = require('./api/routes/user');

mongoose.connect("mongodb://"+process.env.MONGODB_ATLAS_USER+":"+process.env.MONGODB_ATLAS_PASSWORD+"@cluster0-shard-00-00-jbdji.mongodb.net:27017,cluster0-shard-00-01-jbdji.mongodb.net:27017,cluster0-shard-00-02-jbdji.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin")

// log des informations sur les requetes
app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-Width, Content-Type; Accept, Authorization');

    // Liste des méthodes acceptées par l'api pour renvoyer une réponse
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
        return res.status(200).json({})
    }
    next()
});

app.use('/user', userRoutes);
app.use('/task', taskRoutes);

module.exports = app;