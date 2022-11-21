import express from 'express';
import { signin, signup, getVerified, addWishlist, removeWishlist, getWishlist } from '../controller/user.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();
router.post('/signin', signin)
router.post('/signup', signup)
router.get('/:userId/verify/:verifyId', getVerified)
router.post('/wishlist/:id', auth, addWishlist)
router.delete('/wishlist/:id', auth, removeWishlist)
router.get('/wishlist', auth, getWishlist)
export default router;