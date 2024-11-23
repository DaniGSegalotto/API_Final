import express from 'express'   
import { healthcheck } from '../controllers/utilsControllers'

const router = express.Router()

router.get('/healthcheck', healthcheck)

export default router