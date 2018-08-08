import mongoose from 'mongoose';
import databaseConnections from '../config/database';
const dbLink = mongoose.createConnection(databaseConnections.dataConnection, { useNewUrlParser: true })
const Schema = mongoose.Schema;


const nomenclatorSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    type: { type: 'String', required: true },
    vehcat: { type: 'String', required: false },
    vehmade: { type: 'String', required: false },
    vehtype: { type: 'String', required: false },
    partcat: { type: 'String', required: false },
    partsubcat: { type: 'String', required: false },
    partname: { type: 'String', required: false },
});

const vehicleNomenclatorSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    type: { type: 'String', required: true },
    vehcat: { type: 'String', required: false },
    vehmade: { type: 'String', required: false },
    vehtype: { type: 'String', required: false },
});

const partNomenclatorSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    partcat: { type: 'String', required: false },
    partsubcat: { type: 'String', required: false },
    partname: { type: 'String', required: false },
});

export const Nomenclator = dbLink.model('Nomenclator', nomenclatorSchema, 'nomenclator');
export const VehiclesNomenclator = dbLink.model('VehiclesNomenclator', vehicleNomenclatorSchema, 'nomenclator');
export const PartsNomenclator = dbLink.model('PartsNomenclator', partNomenclatorSchema, 'nomenclator');