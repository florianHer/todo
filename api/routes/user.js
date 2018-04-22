const router = require('express').Router();

// Afficher les utilisateurs
router.get(
    '/',
    require('../controllers/user').get_all
);

// Ajouter un utilisateur
router.post(
    '/signup',
    require('../controllers/user').user_signup
);

// Se connecter
router.post(
    '/login',
    require('../controllers/user').user_login
);

// Supprimer un utilisateur
// router.delete('/:userId', (req, res, next) => {
//
// });

module.exports = router;