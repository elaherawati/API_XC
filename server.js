var http = require('http'),
	connect = require('connect'),
	redirect = require('connect-redirection'),
	routeHandle = require('./libs/routes/reshandle'),
	LoginHandle = require('./libs/api/login'),
	SignupHandle =  require('./libs/api/signup'),
	compHandle =  require('./libs/api/companies'),
	ferHandle = require('./libs/api/ferify'),
	tenHandle = require('./libs/api/tenant'),
	usHandle = require('./libs/api/user'),
	grHandle = require('./libs/api/group'),
	modHandle = require('./libs/api/modules'),
	roleHandle = require('./libs/api/roles')

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
app.use(ferHandle.ferRoute);
app.use(tenHandle.tenRoute);
app.use(usHandle.usRoute);
app.use(grHandle.grRoute);
app.use(modHandle.modRoute);
app.use(roleHandle.roleRoute);

var server = http.createServer(app).listen(8899, function () {
	console.log("Server listening on port 8899...");
});