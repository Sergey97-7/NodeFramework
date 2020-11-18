const url = require('url');
const { StringDecoder } = require('string_decoder');
const Router = require('./packages/Router');
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const fs = require('fs');
const enumLogLevels = {
    debug: '1',
}

//TODO удалить рудименты (root,)
class App {
    constructor() {}
    routers = [];
    pathGroups = [];
    static Router = Router;
    rootRouter = new Router()
    defaultRouter = null

    getReqParams(req) {
        const parsedUrl = url.parse(req.url, true);
        return {
            parsedUrl,
            path: parsedUrl.pathname,
            method: req.method.toLowerCase(),
            query: parsedUrl.query,
            headers: req.headers,
            ip: req.ip
        }
    }
    reqListner = (req, res) => {
        const {
            path,
            method,
            query,
            headers
        } = this.getReqParams(req);
        let result = null;
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        req.on('end', () => {
            body = Buffer.concat(body).toString();
            //TODO сформировать для handlePath объект, включить туда и req.
            console.log('body', body)
            result = this.handlePath(path, method, query, headers, body, res, req);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write(result ? result : 'Hello World!');
            res.end();
        });
    }
    useRouter(path, router) {
            //setHandler() для рут роутера?
            router.addPathPiece(path);
            this.routers.push(router);
            if (this.defaultRouter === null) {
                this.defaultRouter = new Router();
            }
            if (path.trim() === '/') {
                this.defaultRouter.root(path, router);
            } else {
                this.rootRouter.root(path, router);
            }
        }
        //TODO возвращать ответ? если не нашлось, то дефолтный ответ
        // переделать unknown path с роутера, сделать единый 404 с html страницей
    handlePath(path, method, query, headers, body, res, req) {
        let result = null;
        this.routers.forEach(router => {
            let a = router.getHandler(path, method, query, headers, body, res, req)
            if (a) {
                result = a;
            }

        })
        return result;
    }
    logger() {}
    routing() {}
    useMiddleWare() {}
}
const cApp = new App();

cApp.useRouter('/', indexRoutes)
cApp.useRouter('/users', userRoutes)

// const a = cApp.handlePath('/', 'get')
const b = cApp.handlePath('/ind/sbc/p', 'get')
const c = cApp.handlePath('/index/abc', 'get')
const d = cApp.handlePath('/index/index', 'get')
const d2 = cApp.handlePath('/index/super/app', 'get')
const e = cApp.handlePath('/users', 'get')

const f = cApp.handlePath('/users/user', 'get');
const g = cApp.handlePath('/users/user', 'get');

// console.log('a', a)
// console.log('b', b)
// console.log('c', c)
// console.log('d', d)
// console.log('e', e)
// console.log('f', f)
// console.log('d2', d2)

module.exports = cApp;