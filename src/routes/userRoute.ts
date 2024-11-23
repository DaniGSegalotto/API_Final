import express from 'express'   
import { UserController } from '../controllers/userController'
import authentication from '../middleware/authentication';

const userController = new UserController();
const router = express.Router()

router.post('/', userController.create)
router.get('/', authentication.hasAuthorization, userController.getAll)
router.get('/:id', userController.getById)
router.put('/:id', userController.update)
router.delete('/:id', userController.delete)

export default router
