var express = require('express');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var consign = require('consign');
var engine = require('ejs-locals');
var bodyParser = require('body-parser');
var Correios = require('node-correios');

var app = express();

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(expressValidator());

app.use(expressSession({
	secret:'6677eedaiiiieeanlllkmcslkdnclsdncklsdnclksçlmsci899',
	resave: false,
	saveUninitialized:false
}));

consign()
	.include('app/routes')
	//.include('app/api')
	//.include('app/utils')
	.then('config/dbConn.js')
	.then('app/models')
	.then('app/controllers')
	.into(app);

module.exports = app;
