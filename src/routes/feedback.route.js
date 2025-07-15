import exppress from 'express'
import { sendFeedback } from '../controllers/feedback.controller.js'
const router = exppress.Router();

router.post('/', sendFeedback);

export default router;