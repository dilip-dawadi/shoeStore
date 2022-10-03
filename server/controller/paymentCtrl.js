import paymentPage from '../models/paymentPage.js';
import Users from '../models/user.js';
import foodPage from '../models/foodPage.js';

export const getPayments = async (req, res) => {
    try {
        const payments = await paymentPage.find();
        // update status
        res.json({ payments, message: "Payments Page" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
};
export const getPaymentClient = async (req, res) => {
    try {
        // check user_id by id
        const user = await Users.findById(req.userId);
        if (!user) return res.status(400).json({ message: "User does not exist." })
        // check payment_id by user_id
        const payment = await paymentPage.find({ user_id: req.userId });
        res.json({ payment, message: "Payment History" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
export const deletePaymentByUser = async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await paymentPage.findById(id);
        if (!payment) return res.status(400).json({ message: "Payment does not exist." })
        if (payment.user_id !== req.userId) return res.status(400).json({ message: "You are not authorized to delete this payment." })
        await paymentPage.findByIdAndDelete(id);
        res.json({ message: "Payment deleted successfully." })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
export const createPayment = async (req, res) => {
    try {
        const user = await Users.findById(req.userId).select('name email');
        if (!user) return res.status(400).json({ message: "User does not exist." })

        const { cart, paymentID, address } = req.body;

        const { _id, name, email } = user;

        const newPayment = new paymentPage({
            user_id: _id, name, email, cart, paymentID, address
        })

        cart.filter(item => {
            return sold(item._id, item.quantity, item.sold)
        })
        await Users.findByIdAndUpdate(_id, { cart: [] });
        await newPayment.save()
        res.json({ message: "Payment Succes!" })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
};

const sold = async (id, quantity, oldSold) => {
    const availableQuantity = await foodPage.findById(id).select('quantity');
    const prevQuantity = availableQuantity.quantity;
    if (!quantity) return res.status(400).json({ message: "Quantity does not exist." })
    await foodPage.findOneAndUpdate({ _id: id }, {
        sold: quantity + oldSold,
        quantity: prevQuantity - quantity
    })
};

export const getStatus = async (req, res) => {
    try {
        const paymentFood = await paymentPage.findOne({ _id: req.params.id })
        if (paymentFood.status === false) {
            await paymentPage.findOneAndUpdate({ _id: req.params.id }, {
                status: true
            }, { new: true });
        } else {
            await paymentPage.findOneAndUpdate({ _id: req.params.id }, {
                status: false
            }, { new: true });
        }
        res.json({
            message: "Status Updated",
        })
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
}
