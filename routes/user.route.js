const { Router } = require('express');
const { check } = require('express-validator');
const {
    validateFields,
    validateJWT,
    validateRoleAdmin
} = require('../middlewares')

const { emailExist, existUserById } = require('../helpers');
const {  getUsers, getUserById,postUser, putUser, deleteUser } = require('../controllers/user.controller');
const router = Router();

router.get('/', getUsers);

router.get('/:id', [
    check('id', 'It is not a valid mongo id').isMongoId(),
    check("id").custom(existUserById),
    validateFields],
    getUserById);

router.post(
    '/', [
    check("firstname", "The firstname field is required").not().isEmpty(),
    check("email", "The email field is invalid").isEmail(),
    check("email", "Email in use, there is already a user with this email.").custom(emailExist),
    check("password", "The password field requires a minimun of 6 characters").isLength({ min: 6 }),
    check("role", "It is not an allowed roles").isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateFields],
    postUser)

router.put(
    '/:id', [
    validateJWT,
    check('id', 'It is not a valid mongo id').isMongoId(),
    check("id").custom(existUserById),
    check("firstname", "The firstname field is required").not().isEmpty(),
    check("email", "The email field is invalid").isEmail(),
    check("email", "Email in use, there is already a user with this email.").custom(emailExist),
    check("password", "The password field requires a minimun of 6 characters").isLength({ min: 6 }),
    check("role", "It is not an allowed roles").isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateFields],
    putUser)

router.delete(
    '/:id', [
    validateJWT,
    validateRoleAdmin,
    check('id', 'It is not a valid mongo id').isMongoId(),
    check("id").custom(existUserById),
    validateFields],
    deleteUser)

module.exports = router;