var app = require('./config/server');
var port = 3131;

app.listen(port, function(){
	console.log("Server Controll Customers Online on Port "+port);	
});