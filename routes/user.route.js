const { Router } = require('express');
const { check } = require('express-validator');
const { renewToken, login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares');
//const { login, googleSignIn, renovarToken } = require('../controllers/auth.controller');
//const { validarJWT,validarCampos } = require('../middlewares');
const router = Router();
/*
router.post(
    '/',
    /*[
        check('email', 'The mail is required.').isEmail(),
        check('password', 'The mail is required.').not().isEmpty(),
        validateFields
    ],
    createUser)*/

router.get('/',
    //valida,
    renewToken)


module.exports = router;