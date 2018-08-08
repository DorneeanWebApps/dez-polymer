require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('./config.json');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressJwt({ secret: config.secret }).unless({
    path: ['/api/superusers/authenticate',
        '/api/superusers/register',
        '/api/appusers/authenticate',
        '/api/appusers/register',
        '/api/appusers/checkuniquename',
        '/api/appusers/checkuniquemail',
        '/api/appelements',
        '/api/vehicles/getByQuery',
        '/api/parts/getByQuery',
        '/api/nomenclator/queryIfExists',
        '/api/nomenclator/getVehicleByQuery',
        '/api/nomenclator/getPartByQuery',
        '/api/nomenclator/getPartNames'
    ]
}));


app.use('/api/appelements', require('./controllers/appelements.controller'));
app.use('/api/appcomponents', require('./controllers/leftmenu.controller'));
app.use('/api/superusers', require('./controllers/superusers.controller'));
app.use('/api/appusers', require('./controllers/appusers.controller'));
app.use('/api/dorneeandata', require('./controllers/dorneeandata.controller'));
app.use('/api/workdata', require('./controllers/workdata.controller'));
app.use('/api/vehicles', require('./controllers/vehicles.controller'));
app.use('/api/parts', require('./controllers/parts.controller'));
app.use('/api/nomenclator', require('./controllers/nomenclator.controller'));



var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function() {
    console.log('Server listening on port ' + port);
});