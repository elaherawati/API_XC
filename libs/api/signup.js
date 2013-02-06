var connect = require('connect');
    connectRoute = require('connect-route'),
    url = require('url'),
    render = require('connect-render'),
	mongoose = require('mongoose'),
    ModelSchema = require('../db/models'),
    UsersModel = ModelSchema.UsersModel

 // *****Sign Up*****
var s_route = function(r) {
    r.post('/signup/proses', function(_req, _res){
        var user;
        user = new UsersModel({
            username: _req.body.username,
            password: _req.body.password,
            group_id: _req.body.group_id,
            api_key: _req.body.api_key,
            workspace: _req.body.workspace,
            email: _req.body.email,
			status: 1
        });
        user.save(function(err){
            if(!err){
				/*fs.mkdirParent = function(dirPath, mode, callback) {
					//Call the standard fs.mkdir
					fs.mkdir(dirPath, mode, function(error) {
						//When it fail in this way, do the custom steps
						if (error && error.errno === 34) {
							//Create all the parents recursively
							fs.mkdirParent(path.dirname(dirPath), mode, callback);
							//And then the directory
							fs.mkdirParent(dirPath, mode, callback);
						}
						//Manually run the callback since we used our own callback to do all these
						callback && callback(error);
					});
				};
				// Create Workspace                                
				var users_workspace = 'users/'.concat(req.body.username);   
				fs.mkdirParent(users_workspace);
				fs.mkdirParent(users_workspace.concat('/logs'));
				fs.mkdirParent(users_workspace.concat('/ux'));
				fs.mkdirParent(users_workspace.concat('/public'));
				fs.mkdirParent(users_workspace.concat('/res'));
				fs.mkdirParent(users_workspace.concat('/db'));
				*/
                _res.end("USER SAVE");
                _res.redirect('/');
            }else{
                _res.end("ERROR");
            };
        }); 
	});
};
var signRoute = connectRoute(s_route);
exports.signRoute = signRoute;