import express from 'express';
import shortenLink from '../controllers/shorten.controller.js';

const router = express.Router()

router.post('/', shortenLink)

export default router;