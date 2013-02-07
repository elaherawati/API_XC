var connect = require('connect');
    connectRoute = require('connect-route'),
    url = require('url'),
    render = require('connect-render'),
	mongoose = require('mongoose'),
    ModelSchema = require('../db/models'),
    UsersModel = ModelSchema.UsersModel,
    dataModel = ModelSchema.dataModel,
	roleModel = ModelSchema.roleModel
	
	
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
		                    if(_req.params.fn_ws == 'roles'){
								roles = new roleModel({
									menu_id: _req.body.menu_id,
									group_id: _req.body.group_id,
									is_active: _req.body.is_active
								});
								roles.save(function(err){
									if(!err){
										//_res.redirect('/member');
										_res.end("roles SAVE");
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
							if (_req.params.fn_ws == 'roles'){
								var url_path = url.parse(_req.url, true);
									roleModel.find(url_path, function(err, rl){
									if(!err){
										console.log(rl);
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
		                    if(_req.params.fn_ws == 'roles'){
								var url_path = url.parse(_req.url, true);
								return roleModel.findOne(url_path, function(err, rl){
									if(!err){
										rl.menu_id = _req.body.menu_id,
										rl.group_id = _req.body.group_id,
										rl.is_active = _req.body.is_active
										rl.save(function(error){
											if(!error){
												return _res.end("ROLES UPDATE");
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
                            if(_req.params.fn_ws == 'roles'){
								var url_path = url.parse(_req.url, true);
								return dataModel.findOne(url_path, function(err, data){
								  if (!err){
									return data.remove(function(error){
									  if(!error){
										return _res.end("roles has Delete !!!");
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
var roleRoute = connectRoute(c_route);
exports.roleRoute = roleRoute;