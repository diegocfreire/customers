function clienteDAO( connection ){
	this._connection = connection; 
}

clienteDAO.prototype.view = function(cliente, callback) {
	var sql = ' select * from cliente ';
	if (cliente.id) {
		sql += ' where id =  '+cliente.id;
	}
	sql += ' order by id ';
	this._connection.query(sql, callback);
}


clienteDAO.prototype.salvar = function( cliente, callback) {	
	if (!cliente.id) {
		this._connection.query('insert into cliente set ?', cliente, callback);	
	} else {
		this._connection.query('update cliente set ? where id = ?', [ cliente, cliente.id], callback);
	}
}

clienteDAO.prototype.excluir = function( cliente, callback) {	
	this._connection.query('delete from cliente where id = ? ', cliente.id, callback);	
}

module.exports = function(){
	return clienteDAO;
};