module.exports = function(application){

	application.get('/clienteListar', function(req, res){
		application.app.controllers.cliente.index(application, req, res);
	});

	application.get('/novoCliente', function(req, res){
		application.app.controllers.cliente.novo(application, req, res);
	});

	application.post('/salvarCliente', function(req, res){
		application.app.controllers.cliente.salvar(application, req, res);
	});

	application.get('/excluirCliente/:_id', function(req, res){
		application.app.controllers.cliente.excluir(application, req, res);
	});

	application.get('/editarCliente/:_id', function(req, res){
		application.app.controllers.cliente.editar(application, req, res);
	});
}
