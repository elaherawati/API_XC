var connect = require('connect');
    connectRoute = require('connect-route'),
    url = require('url'),
    render = require('connect-render'),
	mongoose = require('mongoose'),
    ModelSchema = require('../db/models'),
    UsersModel = ModelSchema.UsersModel,
    dataModel = ModelSchema.dataModel,
	modModel = ModelSchema.modModel
	
	
var c_route = function(r) {
       
    // *****Create data*****
    r.post('/:r/:key/:ws/c/:fn_ws', function(_req, _res){
        if(_req.params.r == 'api'){
            var select = {
                api_key: _req.params.key,
                workspace: _req.params.ws,
            }
            UsersModel.findOne(select, function(err, ku){
                if (ku) {
                    var UK = ku.api_key;
                    console.log(UK);
                    if(_req.params.key == UK){
                        var WS = ku.workspace;
                        if(_req.params.ws == WS){
                            //_res.end("LANJUUUTTT");
                        ///////////ISI///////////
		                    if(_req.params.fn_ws == 'modules'){
								modules = new modModel({
									parent_id: _req.body.parent_id,
									title: _req.body.title,
									handler: _req.body.handler,
									published: _req.body.published,
									sort_id: _req.body.sort_id
								});
								modules.save(function(err){
									if(!err){
										//_res.redirect('/member');
										_res.end("modules SAVE");
									}else{
										//_res.redirect('/insert');
										_res.end("ERROR");
									};
								});
							} else {
								_res.redirect('/api');
							};
                        //////////////////////////
                        }else{
                            _res.redirect('/api');
                        };
                    }else{
                        _res.redirect('/api');
                    };
                } else {
                    _res.redirect('/api');
                };
            });
        }else{
            _res.redirect('/api');
        }
    });
    
    // *****Read data*****
    r.get('/:r/:key/:ws/r/:fn_ws', function(_req, _res){
        if(_req.params.r == 'api'){
            var select = {
                api_key: _req.params.key,
                workspace: _req.params.ws
            }
            UsersModel.findOne(select, function(err, ku){
                if (ku) {
                    var UK = ku.api_key;
                    console.log(UK);
                    if(_req.params.key == UK){
                        var WS = ku.workspace;
                        if(_req.params.ws == WS){
                            //_res.end("LANJUUUTTT");
                        ///////////ISI///////////
							if (_req.params.fn_ws == 'modules'){
								var url_path = url.parse(_req.url, true);
									modModel.find(url_path, function(err, mdl){
									if(!err){
										console.log(mdl);
									}else{
										_res.end("data kosong");
										return console.log(err);
									}
								});
							} else {
								_res.end('salah');
							}
                        //////////////////////////
                        }else{
                            _res.redirect('/api');
                        }
                    }else{
                        _res.redirect('/api');
                    }
                } else {
                    _res.redirect('/api');
                }
            });
        }else{
            _res.redirect('/api');
        }
    });

    // *****Update Data*****
    r.put('/:r/:key/:ws/u/:fn_ws', function(_req, _res){
        if(_req.params.r == 'api'){
            var select = {
                api_key: _req.params.key,
                workspace: _req.params.ws
            }
            UsersModel.findOne(select, function(err, ku){
                if (ku) {
                    var UK = ku.api_key;
                    console.log(UK);
                    if(_req.params.key == UK){
                        var WS = ku.workspace;
                        if(_req.params.ws == WS){
                            //_res.end("LANJUUUTTT");
                        ///////////ISI///////////
		                    if(_req.params.fn_ws == 'modules'){
								var url_path = url.parse(_req.url, true);
								return modModel.findOne(url_path, function(err, mdl){
									if(!err){
										mdl.parent_id = _req.body.parent_id,
										mdl.title = _req.body.title,
										mdl.handler = _req.body.handler,
										mdl.published = _req.body.published,
										mdl.sort_id = _req.body.sort_id
										mdl.save(function(error){
											if(!error){
												return _res.end("MODULES UPDATE");
											}else{
												console.log(error);
												_res.end("ERROR");
											}
										});
									}else{
										console.log(err);
									}
								});
							} else {
								_res.redirect('/api');
							}
                        //////////////////////////
                        }else{
                            _res.redirect('/api');
                        }
                    }else{
                        _res.redirect('/api');
                    }
                } else {
                    _res.redirect('/api');
                }
            });
        }else{
            _res.redirect('/api');
        }
    });
    
    // *****Delete Data*****
        r.delete('/:r/:key/:ws/d/:fn_ws', function(_req, _res){
        if(_req.params.r == 'api'){
            var select = {
                api_key: _req.params.key,
                workspace: _req.params.ws
            }
            UsersModel.findOne(select, function(err, ku){
                if (ku) {
                    var UK = ku.api_key;
                    console.log(UK);
                    if(_req.params.key == UK){
                        var WS = ku.workspace;
                        if(_req.params.ws == WS){
                            //_res.end("LANJUUUTTT");
                        ///////////ISI///////////
                            if(_req.params.fn_ws == 'modules'){
								var url_path = url.parse(_req.url, true);
								return dataModel.findOne(url_path, function(err, data){
								  if (!err){
									return data.remove(function(error){
									  if(!error){
										return _res.end("modules has Delete !!!");
									  }else{
										return console.log(error);
									  };
									});
								  }else{
									return console.log(err);
								  };
								});
							} else {
								_res.redirect('/api');
							}
                        //////////////////////////
                        }else{
                            _res.redirect('/api');
                        }
                    }else{
                        _res.redirect('/api');
                    }
                } else {
                    _res.redirect('/api');
                }
            });
        }else{
            _res.redirect('/api');
        }
    });
};
var modRoute = connectRoute(c_route);
exports.modRoute = modRoute;