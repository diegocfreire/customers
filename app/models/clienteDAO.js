function clienteDAO( connection ){
	this._connection = connection; 
}

clienteDAO.prototype.listar = function( callback) {
	this._connection.query('select * from cliente order by id', callback);	
}

clienteDAO.prototype.salvar = function( cliente, callback) {	
	this._connection.query('insert into cliente set ?', cliente, callback);	
}

clienteDAO.prototype.alterar = function( id, cliente, callback) {	
	this._connection.query('update cliente set ? where id = ?', [ cliente, id], callback);	
}

clienteDAO.prototype.editar = function( cliente, callback) {
	this._connection.query('select * from cliente where id = ' + cliente._id, callback);
}

clienteDAO.prototype.excluir = function( cliente, callback) {	
	this._connection.query('delete from cliente where id = ? ', cliente.id, callback);	
}

module.exports = function(){
	return clienteDAO;
};