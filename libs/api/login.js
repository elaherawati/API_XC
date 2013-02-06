var connect = require('connect');
    connectRoute = require('connect-route'),
    url = require('url'),
    render = require('connect-render');

 // *****Login*****
var route = function (r) {
	r.post('/login/process', function (_req, _res) {
		var select = {
			username: _req.body.username
		  , password: _req.body.password
		};
	  
		UsersModel.findOne(select, function(err, users) {
		  if (!err && users) {
			// Register session
			_req.session.username = _req.body.username;
			_req.session.api_key = users.api_key;
			_req.session.workspace = users.workspace;
			_res.redirect('/user');
		  } else {
			// Login failed
			_res.redirect('/login');
		  }
		  
		});
	});
};
var LoginRoute = connectRoute(route);

exports.LoginRoute = LoginRoute;