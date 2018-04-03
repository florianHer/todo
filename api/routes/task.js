const router = require('express').Router();
const auth = require('../middleware/auth');

// Afficher toutes les taches
router.get(
    '/',
    require('../controllers/task').get_all
);

// Afficher une tache
router.get(
    '/:taskId',
    require('../controllers/task').get_task
);

// Ajouter une tache
router.post(
    '/',
    require('../controllers/task').add_task
);

// Modifier une tache
router.patch(
    '/:taskId',
    require('../controllers/task').update_task
);

// Supprimer une tache
router.delete(
    '/:taskId',
    auth,
    require('../controllers/task').remove_task
);

module.exports = router;