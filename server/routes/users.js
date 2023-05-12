import express from 'express';
import { signin, signup, signOut, getVerified, addWishlist, removeWishlist, getWishlist, getCart, addCart, removeCart, cartQuantity, checkout } from '../controller/user.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();
router.post('/signin', signin)
router.post('/signup', signup)
router.get('/signout', auth, signOut)
router.get('/:userId/verify/:verifyId', getVerified)
router.post('/wishlist/:id', auth, addWishlist)
router.delete('/wishlist/:id', auth, removeWishlist)
router.get('/wishlist', auth, getWishlist)
router.get('/cart', auth, getCart)
router.post('/cart/:id', auth, addCart)
router.delete('/cart/:id', auth, removeCart)
router.post('/cart/:id/quantity', auth, cartQuantity)
router.post('/checkout', auth, checkout)
export default router;