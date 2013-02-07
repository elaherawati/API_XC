var connect = require('connect');
    connectRoute = require('connect-route'),
    url = require('url'),
    render = require('connect-render'),
	mongoose = require('mongoose'),
    ModelSchema = require('../db/models'),
    UsersModel = ModelSchema.UsersModel
	
var f_route = function(r) {
    // *****Read Activation*****
    r.get('/:r/:key/:ws', function(_req, _res){
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
                            _res.end("LANJUUUTTT");
                        ///////////ISI///////////
                        
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
var ferRoute = connectRoute(f_route);
exports.ferRoute = ferRoute;