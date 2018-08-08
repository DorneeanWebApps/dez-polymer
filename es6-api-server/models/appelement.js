import mongoose from 'mongoose';
import databaseConnections from '../config/database';
const dbLink = mongoose.createConnection(databaseConnections.setupConnection, { useNewUrlParser: true })
const Schema = mongoose.Schema;


const appElementSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    vehicle_categories: {
        type: "Object",
        category: {
            type: "String",
            required: true
        },
        subcategories: {
            type: Array,
        },
        selected: Boolean,
        required: true
    },
    parts_categories: {
        type: "Object",
        category: {
            type: "String",
            required: true
        },
        subcategories: {
            type: Array,
        },
        selected: Boolean,
        required: true
    },
});

export const AppElement = dbLink.model('AppElement', appElementSchema, 'appelements');