import express from 'express'   
import { PetController } from '../controllers/petController'
import authentication from '../middleware/authentication';

const petController = new PetController();
const router = express.Router()

router.post('/', petController.create)
router.get('/', authentication.hasAuthorization, petController.getAll)
router.get('/:id', petController.getById)
router.put('/:id', petController.update)
router.delete('/:id', petController.delete)

export default router
