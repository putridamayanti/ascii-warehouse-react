const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('routes.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.use((req, res, next) => {
    console.log(req);
    next();
});

// module.exports = () => {
//     console.log('a');
// };

server.listen(3000, () => {
    console.log('JSON Server is running http://localhost:3000');
});
//
// var http = require('http');
// // var serveStaticFiles = require('ecstatic')({ root: __dirname + '/static' });
// var port = process.env.PORT || 8000;
//
// http.createServer(function (req, res) {
//     // if (req.url.indexOf('/ad') === 0) {
//     //     return require('./lib/http-handle-ads')(req, res);
//     // }
//     //
//     // if (req.url.indexOf('/api') === 0) {
//     //     return require('./lib/http-handle-api')(req, res);
//     // }
//
//     // default: handle the request as a static file
//     // serveStaticFiles(req, res);
// }).listen(port);
//
// console.log('Listening on http://localhost:%d', port);
