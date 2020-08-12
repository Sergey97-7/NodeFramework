const url = require('url');
const { StringDecoder } = require('string_decoder');
const Router = require('./packages/Router');
const indexRoutes = require('./routes/index');
const enumLogLevels = {
    debug: '1',
}
class App {
    constructor() {}
    static Router = Router;
    logger() {}
    routing() {}
    useMiddleWare() {}
}

function app(req, res) {

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    // console.log('path.trim', path.replace(/^\/*|\/+$/g, ''))
    const method = req.method.toLowerCase();
    const query = parsedUrl.query;
    const headers = req.headers;
    // console.log('body', parsedUrl)
    // console.log('req', req)
    // let body = '';
    // const decoder = new StringDecoder('utf-8');

    // req.on('data', (data) => {
    //     // body += data.toString('utf-8');
    //     body += decoder.write(data);
    // })
    // req.on('end', (data) => {
    //     // body.concat(data)
    //     body += decoder.end();
    //     console.log('body1', data)
    // })
    // console.log('body2', body)
    let result = indexRoutes.getHandler(path, method);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(result ? result : 'Hello World!');
    res.end();
}
module.exports = app;