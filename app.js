var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

connections = [];
users = [];

var port = process.env.PORT || 5000;
var nav = [{
    Link: '/Books',
    Text: 'Book'
    }, {
    Link: '/contact',
    Text: 'Contact'
    }];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var contactRouter = require('./src/routes/contactRoutes');

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');


app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});

app.use('/contact', contactRouter);


io.sockets.on('connection', function (socket) {
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);
});
