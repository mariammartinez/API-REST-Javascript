const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const saucesCtrl = require('../controller/sauces');
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, saucesCtrl.createSauce);
router.post('/:id/like', auth, saucesCtrl.createLike);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/:id',auth, saucesCtrl.getOneSauce);
router.get('/',auth, saucesCtrl.getAllSauces);
 

module.exports = router;