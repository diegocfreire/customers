module.exports.index = function( application, req, res ){
    var clienteDao = new application.app.models.clienteDAO(global.conn);
    var cliente = req.params;
    clienteDao.view(cliente,function(error, clientes){
        if( error ) {
            res.render('clienteListar', { validacao : [ {'msg': error.sqlMessage }], clientes : {} });
            return;
        }
        console.log(cliente);
        res.render('clienteListar', { validacao : {}, clientes : clientes });
    });
}

module.exports.novo = function( application, req, res ){    
    res.render('clienteEditar', { validacao : {}, clientes : {} });
}

module.exports.editar = function( application, req, res ){
    var cliente = { id: req.params.id.split(':')[1] };

    var clienteDao = new application.app.models.clienteDAO(global.conn);
    
    clienteDao.view( cliente, function(error, clientes){
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
    
    var clienteDao = new application.app.models.clienteDAO(global.conn);    
    clienteDao.salvar(dadosForms, function(error, result){            
        if( error ) {
            res.render('clienteEditar', { validacao : [ {'msg': error.sqlMessage }], clientes : {} });
            return;
        }
        res.redirect('/clienteListar');
    });
}

module.exports.excluir = function( application, req, res ){
    
    var cliente = { id: req.params.id.split(':')[1] };
    var clienteDao = new application.app.models.clienteDAO(global.conn);
    
    clienteDao.excluir( cliente, function(error, clientes){
        if( error ) {
            res.render('clienteListar', { validacao : [ {'msg':error.error }], clientes : clientes });
        }
        res.redirect("/clienteListar");
    });
}
