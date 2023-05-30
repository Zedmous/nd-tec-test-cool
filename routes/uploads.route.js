const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields, validateArchive } = require('../middlewares');
const { updateImgColection, showImg, updateImagesDestination, showImagesDestination } = require('../controllers/uploads.controller');
const { collectionsAllowed } = require('../helpers');
const router = Router();

router.put('/:collection/:id', [
    validateArchive,
    check('id', 'It is not a valid mongo id').isMongoId(),
    check("collection").custom(c => collectionsAllowed(c, ['users', 'destinations'])),
    validateFields],
    updateImgColection);

router.get('/:collection/:id', [
    check('id', 'It is not a valid mongo id').isMongoId(),
    check("collection").custom(c => collectionsAllowed(c, ['users', 'destinations'])),
    validateFields],
    showImg);

router.put('/destination/save/catalogue/:id', [
    validateArchive,
    check('id', 'It is not a valid mongo id').isMongoId(),
    validateFields],
    updateImagesDestination);

router.get('/destination/show/catalogue/:id', [
    check('id', 'It is not a valid mongo id').isMongoId(),
    validateFields],
    showImagesDestination);




module.exports = router;