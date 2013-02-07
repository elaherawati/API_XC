var connect = require('connect');
    connectRoute = require('connect-route'),
    url = require('url'),
    render = require('connect-render'),
	mongoose = require('mongoose'),
    ModelSchema = require('../db/models'),
    UsersModel = ModelSchema.UsersModel,
    dataModel = ModelSchema.dataModel,
	usModel = ModelSchema.usModel
	
	
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
		                    if(_req.params.fn_ws == 'user'){
								user = new usModel({
									user_name: _req.body.user_name,
									id_group: _req.body.id_group,
									real_name: _req.body.real_name,
									is_active: _req.body.is_active,
									last_login: _req.body.last_login,
									id_tenant: _req.body.id_tenant
								});
								user.save(function(err){
									if(!err){
										//_res.redirect('/member');
										_res.end("DATA SAVE");
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
							if (_req.params.fn_ws == 'user'){
								var url_path = url.parse(_req.url, true);
									usModel.find(url_path, function(err, usr){
									if(!err){
										console.log(usr);
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
		                    if(_req.params.fn_ws == 'user'){
								var url_path = url.parse(_req.url, true);
								return usModel.findOne(url_path, function(err, usr){
									if(!err){
										usr.user_name = _req.body.user_name,
										usr.id_group = _req.body.id_group,
										usr.real_name = _req.body.real_name,
										usr.is_active = _req.body.is_active,
										usr.last_login = _req.body.last_login,
										usr.id_tenant = _req.body.id_tenant
										usr.save(function(error){
											if(!error){
												return _res.end("USERS UPDATE");
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
                            if(_req.params.fn_ws == 'user'){
								var url_path = url.parse(_req.url, true);
								return dataModel.findOne(url_path, function(err, data){
								  if (!err){
									return data.remove(function(error){
									  if(!error){
										return _res.end("User has Delete !!!");
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
var usRoute = connectRoute(c_route);
exports.usRoute = usRoute;