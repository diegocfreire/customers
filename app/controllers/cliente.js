module.exports.index = function( application, req, res ){
    var resultado;
    var connection = application.config.dbConn();
    var clienteDao = new application.app.models.clienteDAO(connection);
    
    clienteDao.listar(function(error, clientes){
        if( error ) {
            res.render('clienteListar', { validacao : [ {'msg': error.sqlMessage }], clientes : {} });
            return;
        }
        res.render('clienteListar', { validacao : {}, clientes : clientes });
    });
}

module.exports.novo = function( application, req, res ){    
    res.render('clienteEditar', { validacao : {}, clientes : {} });
}

module.exports.editar = function( application, req, res ){
    
    var cliente = { _id: req.params._id.split(':')[1] };

    var connection = application.config.dbConn();
    var clienteDao = new application.app.models.clienteDAO(connection);
    
    clienteDao.editar( cliente, function(error, clientes){
        if( error ) {
            res.render('clienteListar', { validacao : [ {'msg': error.sqlMessage }], clientes : {} });
            return;
        }
        res.render('clienteEditar', { validacao : {}, clientes : clientes });
    });
}

module.exports.salvar = function( application, req, res ){
    var dadosForms = req.body;

    req.assert('nome', 'Nome é obrigatório').notEmpty();       
    req.assert('nome', 'Resumo deve conter entre 10 e 60 caracteres').len(10, 60);
    
    var erros = req.validationErrors();

    if(erros){
        res.render('clienteEditar', {validacao: erros,  clientes: dadosForms});
        return;
    }
    
    var connection = application.config.dbConn();
    var clienteDao = new application.app.models.clienteDAO(connection);
    
    if( !dadosForms._id ) {
        var cliente = { 'nome': dadosForms.nome }
        clienteDao.salvar(cliente, function(error, result){
            
            if( error ) {
                res.render('clienteEditar', { validacao : [ {'msg': error.sqlMessage }], clientes : {} });
                return;
            }
            res.redirect('/clienteListar');
        });
    } else {
        var cliente = { 'nome': dadosForms.nome };        
        clienteDao.alterar( dadosForms._id, cliente, function(error, result){
            
            if( error ) {
                res.render('clienteEditar', { validacao : [ {'msg': error.sqlMessage }], clientes : {} });
                return;
            }
            res.redirect('/clienteListar');
        });
    }
}

module.exports.excluir = function( application, req, res ){
    
    var cliente = { id: req.params._id.split(':')[1] };
    var connection = application.config.dbConn();
    var clienteDao = new application.app.models.clienteDAO(connection);
    
    clienteDao.excluir( cliente, function(error, clientes){
        if( error ) {
            res.render('clienteListar', { validacao : [ {'msg':error.error }], clientes : clientes });
        }
        res.redirect("/clienteListar");
    });
}
