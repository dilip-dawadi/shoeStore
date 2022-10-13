import express from 'express';
import { signin, signup, getVerified } from '../controller/user.js';
const router = express.Router();
router.post('/signin', signin)
router.post('/signup', signup)
router.get('/:userId/verify/:verifyId', getVerified)
export default router;