const url = require('url');
const { StringDecoder } = require('string_decoder');
const Router = require('./packages/Router');
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const enumLogLevels = {
    debug: '1',
}
class App {
    constructor() {}
    routers = new Map();
    pathGroups = [];
    static Router = Router;
    rootRouter = new Router()
    useRouter(path, router) {
        //setHandler() для рут роутера?
        this.rootRouter.all(path, router)
    }
    handlePath(path, method) {
        const router = this.rootRouter.getHandler(path);
        console.log('rouTER', router)
        if (router) {
            return router.getHandler(path, method);
        } else {
            return `Unknown path: ${path}`;
        }
    }
    logger() {}
    routing() {}

    // handleRoute(path, method) {
    //     const router = this.pathGroups.find(pathGroup => {
    //         console.log('path', path)
    //         console.log('pathGroup', pathGroup)
    //         return path.startsWith(pathGroup)
    //     });
    //     console.log('router', router);
    //     // console.log('this.routers', this.routers);
    //     if (router) {
    //         return this.routers.get(router).getHandler(path, method);
    //     } else {
    //         return `Unknown path: ${path}`;
    //     }
    // }
    // useRouter(path, router) {
    //     this.routers.set(path, router);
    //     this.pathGroups.push(path);
    //     return this;
    // }
    useMiddleWare() {}
}
const cApp = new App();
cApp.useRouter('/', indexRoutes)
cApp.useRouter('/users', userRoutes)
const a = cApp.handlePath('/', 'get')
const b = cApp.handlePath('/users', 'get')
const c = cApp.handlePath('/usa', 'get')

console.log('new App', new App())
console.log('a', a)
console.log('b', b)
console.log('c', c)

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
// module.exports = app;
module.exports = app;