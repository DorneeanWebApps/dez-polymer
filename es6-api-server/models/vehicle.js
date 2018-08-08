import mongoose from 'mongoose';
import databaseConnections from '../config/database';
const dbLink = mongoose.createConnection(databaseConnections.dataConnection, { useNewUrlParser: true })
const Schema = mongoose.Schema;


const vehicleSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    categorie: { type: 'String', required: true },
    marca: { type: 'String', required: true },
    model: { type: 'String', required: true },
    tip: { type: 'String', required: true },
    fabricatie: { type: 'String', required: true },
    vehno: { type: 'String', required: true },
    km: { type: 'String', required: true },
    pathfolder: { type: 'String', required: true },
    descriere: { type: 'String', required: false },
    valid: { type: 'Boolean', required: true },
    pictures: [{
        filename: 'String',
        category: 'String',
        ratio: 'String',
        parent: 'String',
        path: 'String',
        fullpath: 'String' || 'Object',
        mainpicture: 'Boolean',
        required: false
    }],
    partscats: [{
        type: 'String',
        required: false
    }],
    created_at: { type: 'Date', required: true },
    updated_at: { type: 'Date', required: true },

});


export const Vehicle = dbLink.model('Vehicle', vehicleSchema, 'vehicles');