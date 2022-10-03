import mongoose from "mongoose"

const paymentSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    paymentID: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        default: []
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const paymentModel = mongoose.model("Payments", paymentSchema);
export default paymentModel;