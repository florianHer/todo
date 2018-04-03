const router = require('express').Router();

router.post(
    '/signup',
    require('../controllers/user').user_signup
);

router.post(
    '/login',
    require('../controllers/user').user_login
);

// router.delete('/:userId', (req, res, next) => {
//
// });

module.exports = router;