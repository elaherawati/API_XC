var http = require('http'),
	connect = require('connect'),
	redirect = require('connect-redirection'),
	routeHandle = require('./libs/routes/reshandle'),
	LoginHandle = require('./libs/api/login'),
	SignupHandle =  require('./libs/api/signup'),
	compHandle =  require('./libs/api/companies')

var app = connect(
	render({
		root: __dirname + '/public/',
		layout: false,
		cache: true // `false` for debug
	})
);

app.use(connect.bodyParser());
app.use(connect.cookieParser());
app.use(connect.session({ secret: 'sga'}));
app.use(redirect());

var oneDay = 86400000;
app.use(connect.static(__dirname + '/public/', {maxAge: oneDay, redirect: true} ));

app.use(routeHandle.router.doRoute);
app.use(LoginHandle.LoginRoute);
app.use(SignupHandle.signRoute);
app.use(compHandle.compRoute);

var server = http.createServer(app).listen(8899, function () {
	console.log("Server listening on port 8899...");
});