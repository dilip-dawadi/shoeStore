import mongoose from "mongoose";

const foodPageSchema = mongoose.Schema({
    selectedFile: { type: String },
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

const foodPage = mongoose.model('foodPage', foodPageSchema);

export default foodPage;