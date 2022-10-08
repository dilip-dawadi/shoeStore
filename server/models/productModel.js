import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    selectedFile: { type: [String] },
    title: { type: String },
    description: {
        type: String
    },
    price: {
        type: String
    },
    tags: {
        type: [String]
    },
    quantity: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array,
        default: []
    }
},
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;