const { Router } = require('express');
const { check } = require('express-validator');
const { renewToken, logIn } = require('../controllers/auth.controller');
const { validateFields, validateJWT } = require('../middlewares');
const { existUserByEmail } = require('../helpers');
const { postUser } = require('../controllers/user.controller');

const router = Router();

router.post(
    '/login',
    [
        check('email', 'The mail is required.').isEmail(),
        check('password', 'The mail is required.').not().isEmpty(),
        validateFields
    ],
    logIn)

router.post(
    '/register',
    [
        check("firstname", "The firstname field is required").not().isEmpty(),
        check("email", "The email field is invalid").isEmail(),
        check("email", "Email in use, there is already a user with this email.").custom(existUserByEmail),
        check("password", "The password field requires a minimun of 6 characters").isLength({ min: 6 }),
        check("role", "It is not an allowed roles").isIn(['ADMIN_ROLE', 'USER_ROLE']),
        validateFields
    ],
    postUser)

router.get('/',
    validateJWT,
    renewToken)


module.exports = router;