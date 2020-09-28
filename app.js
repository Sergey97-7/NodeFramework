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
    defaultRouter = null
    useRouter(path, router) {
        //setHandler() для рут роутера?
        if (this.defaultRouter === null) {
            this.defaultRouter = new Router();
        }
        if (path.trim() === '/') {
            this.defaultRouter.root(path, router);
        } else {
            this.rootRouter.root(path, router);
        }
    }
    handlePath(path, method) {
        const defaultRouter = this.defaultRouter.getRouter('/');
        const router = this.rootRouter.getRouter(path);
        let defaultRouterHandledValue;
        if (defaultRouter && typeof defaultRouter === 'object' && defaultRouter.router instanceof Router) {
            defaultRouterHandledValue = defaultRouter.router.getHandler(path, method);
            if (!defaultRouterHandledValue.startsWith('Unknown path')) {
                return defaultRouterHandledValue
            }
        }
        //TODO хардкод, поправить
        if (router && typeof router === 'object' && router.router instanceof Router) {
            let cuttedPath = path.split(router.pathPiece)[1];
            //TODO поправить
            if (!cuttedPath.startsWith('/')) cuttedPath = '/' + cuttedPath;
            return router.router.getHandler(cuttedPath.trim().length === 0 ? '/' : cuttedPath.trim(), method);
        } else {
            return `appUnknown path: ${path}`;
        }

    }
    logger() {}
    routing() {}
    useMiddleWare() {}
}
const cApp = new App();

cApp.useRouter('/', indexRoutes)
cApp.useRouter('/users', userRoutes)

const a = cApp.handlePath('/', 'get')
const b = cApp.handlePath('/index', 'get')
const c = cApp.handlePath('/index/abc', 'get')
const d = cApp.handlePath('/index/index', 'get')
const d2 = cApp.handlePath('/index/super/app', 'get')
const e = cApp.handlePath('/users', 'get')

const f = cApp.handlePath('/users/user', 'get');
// const g = cApp.handlePath('/users/user', 'get');

console.log('a', a)
console.log('b', b)
console.log('c', c)
console.log('d', d)
console.log('e', e)
console.log('f', f)
console.log('d2', d2)

function app(req, res) {

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    // console.log('path.trim', path.replace(/^\/*|\/+$/g, ''))
    const method = req.method.toLowerCase();
    const query = parsedUrl.query;
    const headers = req.headers;
    let result = cApp.handlePath(path, method);
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
    // let result = indexRoutes.getHandler(path, method);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(result ? result : 'Hello World!');
    res.end();
}
module.exports = app;