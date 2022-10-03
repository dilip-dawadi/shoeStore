import express from 'express';
import { getPayments, createPayment, getStatus, getPaymentClient, deletePaymentByUser } from '../controller/paymentCtrl.js'
import { auth, checkAdmin } from '../middleware/auth.js'
const router = express.Router()

router.get('/', auth, checkAdmin, getPayments);
router.get('/client', auth, getPaymentClient);
router.post('/', auth, createPayment);
router.patch('/:id', checkAdmin, getStatus);
router.delete('/:id', auth, deletePaymentByUser);
export default router;