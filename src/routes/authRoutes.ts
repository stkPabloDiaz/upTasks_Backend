import { Router } from 'express'
import { body, param } from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { handlerInputErrors } from '../middleware/validation'
import { authenticate } from '../middleware/auth'

const router = Router()

router.post('/create-account',
    body('name')
        .notEmpty().withMessage('El Nombre no puede ir vacio'),
    body('password')
        .isLength({ min: 8 }).withMessage('El Password es muy corto, minimo 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Los password no son iguales')
        }
        return true
    }),
    body('email')
        .isEmail().withMessage('E-mail no válido'),
    handlerInputErrors,
    AuthController.createAccount
)

router.post('/confirm-account',
    body('token')
        .notEmpty().withMessage('El Token no puede ir vacio'),
    handlerInputErrors,
    AuthController.confirmAccount
)


router.post('/login',
    body('email')
        .isEmail().withMessage('E-mail no válido'),
    body('password')
        .notEmpty().withMessage('El Password no puede ir vacio'),
    handlerInputErrors,
    AuthController.login
)


router.post('/request-code',
    body('email')
        .isEmail().withMessage('E-mail no válido'),
    handlerInputErrors,
    AuthController.requestConfirmationCode
)


router.post('/forgot-password',
    body('email')
        .isEmail().withMessage('E-mail no válido'),
    handlerInputErrors,
    AuthController.forgotPassword
)


router.post('/validate-token',
    body('token')
        .notEmpty().withMessage('El token no puede ir vacio'),
    handlerInputErrors,
    AuthController.validateToken
)


router.post('/update-password/:token',
    param('token')
        .isNumeric().withMessage('Token no válido'),
    body('password')
        .isLength({ min: 8 }).withMessage('El Password es muy corto, minimo 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Los password no son iguales')
        }
        return true
    }),
    handlerInputErrors,
    AuthController.updatePasswordWithToken
)

router.get('/user',
    authenticate,
    AuthController.user
)


/** Profile */
router.put('/profile',
    authenticate,
    body('name')
        .notEmpty().withMessage('El Nombre no puede ir vacio'),
    body('email')
        .isEmail().withMessage('E-mail no válido'),
    handlerInputErrors,
    AuthController.updateProfile
)


router.post('/update-password',
    authenticate,
    body('current_password')
        .notEmpty().withMessage('El Password actual no puede ir vacio'),
    body('password')
        .isLength({ min: 8 }).withMessage('El Password es muy corto, minimo 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Los password no son iguales')
        }
        return true
    }),
    handlerInputErrors,
    AuthController.updateCurrentUserPassword
)


router.post('/check-password',
    authenticate,
    body('password')
        .notEmpty().withMessage('El Password no puede ir vacio'),
    handlerInputErrors,
    AuthController.checkPassword
)


export default router