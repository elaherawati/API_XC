var connect = require('connect');
    connectRoute = require('connect-route'),
    url = require('url'),
    render = require('connect-render'),
    mongoose = require('mongoose'),
    ModelSchema = require('../db/models'),
    UsersModel = ModelSchema.UsersModel,
    dataModel = ModelSchema.dataModel,
	compModel = ModelSchema.compModel,
	tenModel = ModelSchema.tenModel,
	usModel = ModelSchema.usModel,
	groModel = ModelSchema.groModel,
	roleModel = ModelSchema.roleModel;
	//modModel = ModelSchema.modModel,
	//dashModel = ModelSchema.dashModel;

var route = function (r) {
    // Home    
    r.get('/', function (_req, _res, next) {
        _res.render('page/index.html', { url: _req.url });
    });
    
    // Routing
    r.get('/:r', function (_req, _res, next) {
        switch (_req.params.r) {
            case 'api'      :   _res.render('api/index.html', { url: _req.url });
                                break;
            
            case 'login'    :   _res.render('page/login.html', { url: _req.url });
                                break;
								
            case 'signup'   :   _res.render('page/signup.html', { url: _req.url });
                                break;
								
            case 'logout'   :   if (_req.session.username) {
                                    _req.session.destroy();
                                }
                                
                                _res.redirect('/');
                                break;
								
            case 'user'   :   // Check session
                                if (!_req.session.username) {
                                    // If false
                                    _res.redirect('/');
                                } else {
                                    // If true
                                    _res.render('page/member.html', {username: _req.session.username}, { url: _req.url });
                                }
                                break;
								
            case 'insert'   :   if (!_req.session.username) {
                                    // If false
                                    _res.redirect('/');
                                }else{
                                    _res.render('page/product_insert.html', {
										username: _req.session.username,
										api_key: _req.session.api_key,
										workspace: _req.session.workspace
									}, {
										url: _req.url
									});
                                }
                                break;
								
			case 'company'	:// Check session
								if (!_req.session.username) {
									// If false
									_res.redirect('/');
								} else {
									// If true
									compModel.find(function(err, companies) {
										if (!err && companies) {
											_res.render('./page/read.html', {
												username: _req.session.username,
												api_key: _req.session.api_key,
												workspace: _req.session.workspace,
												CompanyList: companies
											}, {
												url: _req.url
											});
										}
									});
								}
								break;
		}
    });
};

var connRoute = connectRoute(route);

var routing = {
    fnRoute: route,
    doRoute: connRoute
};

exports.router = routing;
