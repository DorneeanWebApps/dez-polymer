import http from 'http'
import rootpath from 'rootpath';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import config from './config/index';

import appelements from './routes/appelements.routes';
import nomenclator from './routes/nomenclator.routes';
import vehicles from './routes/vehicles.routes';
import parts from './routes/parts.routes';

rootpath();

let app = express();

let router = express.Router();
router.use(appelements);
router.use(nomenclator);
router.use(vehicles);
router.use(parts);

app.server = http.createServer(app);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', router);

app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
});