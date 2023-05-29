const { Router } = require('express');
const { check } = require('express-validator');
const {
    validateFields,
    validateJWT,
    validateRoleAdmin
} = require('../middlewares')

const { existNameDestination, existDestinationById } = require('../helpers');
const {  getDestinations, getDestinationById,postDestination, putDestination, deleteDestination } = require('../controllers/destination.controller');
const router = Router();

router.get('/', getDestinations);

router.get('/:id', [
    check('id', 'It is not a valid mongo id').isMongoId(),
    check("id").custom(existDestinationById),
    validateFields],
    getDestinationById);

router.post(
    '/', [
    check("name", "The name field is required").not().isEmpty(),
    check("name", "Name in use, there is already a destination with this name.").custom(existNameDestination),
    check("name", "The name field requires a minimun of 3 characters").isLength({ min: 3 }),
    check("description", "The description field is required").not().isEmpty(),
    check("description", "The description field requires a minimun of 15 characters").isLength({ min: 15 }),
    check("attactions", "The attactions field requires a minimun of 15 characters").isLength({ min: 15 }),
    check("activities", "The activities field requires a minimun of 15 characters").isLength({ min: 15 }),
    check("services", "The services field is required").not().isEmpty(),
    check("rating", "The rating field is required").not().isEmpty(),
    validateFields],
    postDestination)

router.put(
    '/:id', [
    validateJWT,
    check("name", "The name field is required").not().isEmpty(),
    check("name", "The name field requires a minimun of 3 characters").isLength({ min: 3 }),
    check("description", "The description field is required").not().isEmpty(),
    check("description", "The description field requires a minimun of 15 characters").isLength({ min: 15 }),
    check("attactions", "The attactions field requires a minimun of 15 characters").isLength({ min: 15 }),
    check("activities", "The activities field requires a minimun of 15 characters").isLength({ min: 15 }),
    check("services", "The services field is required").not().isEmpty(),
    check("rating", "The rating field is required").not().isEmpty(),
    validateFields],
    putDestination)

router.delete(
    '/:id', [
    validateJWT,
    validateRoleAdmin,
    check('id', 'It is not a valid mongo id').isMongoId(),
    check("id").custom(existDestinationById),
    validateFields],
    deleteDestination)

module.exports = router;