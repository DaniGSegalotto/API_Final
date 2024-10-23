import express from 'express'   
import { TarefaController } from '../controllers/tarefaController'
import authentication from '../middleware/authentication';

const tarefaController = new TarefaController();
const router = express.Router()

router.post('/', tarefaController.create)
router.get('/', authentication.hasAuthorization, tarefaController.getAll)
router.get('/:id', tarefaController.getById)
router.put('/:id', tarefaController.update)
router.delete('/:id', tarefaController.delete)

export default router
