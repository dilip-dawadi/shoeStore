import express from 'express';
import { signin, signup, singleUser, updateSingleUser, deleteUser, addCart, getVerified, incrementCart, deleteaCart, reportData, getUsers } from '../controller/user.js';
import { auth, checkAdmin } from '../middleware/auth.js';
const router = express.Router();
router.get('/users', checkAdmin, getUsers);
router.post('/signin', signin)
router.post('/signup', signup)
router.get('/:id/verify/:token', getVerified)
router.get('/singleuser/:id', auth, singleUser)
router.patch('/updatesingleuser/:id', auth, updateSingleUser)
router.delete('/deleteuser/:id', auth, deleteUser)
router.patch('/addcart', auth, addCart)
router.patch('/increment/:id', auth, incrementCart)
router.patch('/dltcart/:id', auth, deleteaCart)
router.post('/report/:userId', auth, reportData)
export default router;