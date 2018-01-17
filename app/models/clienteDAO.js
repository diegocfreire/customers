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
	var sql = '';	
	if (!cliente.id) {
		sql = 'insert into cliente (nome) values("'+cliente.nome+'")';	
	} else {
		sql = 'update cliente set nome = "'+cliente.nome+'" where id = '+cliente.id;
	}
	console.log(sql);
	this._connection.query(sql,callback);
}

clienteDAO.prototype.excluir = function( cliente, callback) {	
	this._connection.query('delete from cliente where id = ? ', cliente.id, callback);	
}

module.exports = function(){
	return clienteDAO;
};