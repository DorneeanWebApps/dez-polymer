import mongoose from 'mongoose';
import databaseConnections from '../config/database';
const dbLink = mongoose.createConnection(databaseConnections.dataConnection, { useNewUrlParser: true })
const Schema = mongoose.Schema;


const partSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    partno: { type: 'Number', required: true },
    categorie: { type: 'String', required: true },
    subcategorie: { type: 'String', required: false },
    denumire: { type: 'String', required: true },
    pret: { type: 'String', required: true },
    cod: { type: 'String', required: false },
    marca: { type: 'String', required: true },
    model: { type: 'String', required: true },
    tip: { type: 'String', required: true },
    fabricatie: { type: 'String', required: true },
    veh_id: { type: 'String', required: true },
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
    created_at: { type: 'Date', required: true },
    updated_at: { type: 'Date', required: true },

});


export const Part = dbLink.model('Part', partSchema, 'parts');