var connect = require('connect');
    connectRoute = require('connect-route'),
    url = require('url'),
    render = require('connect-render'),
	mongoose = require('mongoose'),
    ModelSchema = require('../db/models'),
    UsersModel = ModelSchema.UsersModel,
    dataModel = ModelSchema.dataModel,
	tenModel = ModelSchema.tenModel
	
	
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
		                    if(_req.params.fn_ws == 'tenant'){
								tenant = new tenModel({
									init_tenant: _req.body.init_tenant,
									nama_tenant: _req.body.nama_tenant,
									alamat_tenant: _req.body.alamat_tenant,
									no_telp: _req.body.no_telp,
									pic: _req.body.pic,
									notes: _req.body.notes
								});
								tenant.save(function(err){
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
							if (_req.params.fn_ws == 'tenant'){
								var url_path = url.parse(_req.url, true);
									tenModel.find(url_path, function(err, tens){
									if(!err){
										console.log(tens);
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
		                    if(_req.params.fn_ws == 'tenant'){
								var url_path = url.parse(_req.url, true);
								return tenModel.findOne(url_path, function(err, tens){
									if(!err){
										tens.init_tenant = _req.body.init_tenant,
										tens.nama_tenant = _req.body.nama_tenant,
										tens.alamat_tenant = _req.body.alamat_tenant,
										tens.no_telp = _req.body.no_telp,
										tens.pic = _req.body.pic,
										tens.notes = _req.body.notes
										tens.save(function(error){
											if(!error){
												return _res.end("TENANT UPDATE");
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
                            if(_req.params.fn_ws == 'tenant'){
								var url_path = url.parse(_req.url, true);
								return dataModel.findOne(url_path, function(err, data){
								  if (!err){
									return data.remove(function(error){
									  if(!error){
										return _res.end("Tenant has Delete !!!");
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
var tenRoute = connectRoute(c_route);
exports.tenRoute = tenRoute;