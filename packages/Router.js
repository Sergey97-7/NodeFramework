const httpMethods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head'];
class Router {
    constructor() {
        this.pathPrefix = '/';
        //TODO оставить один Map
        this.routes = new Map();
        this.routes2 = [];
    }
    static checkPath(path) {
        if (typeof path !== 'string') {
            throw new Error('Path must be a string');
        }
        return path;
    }
    static getRouteParams(path) {
            const pieces = path.split('/');

            return pieces.reduce((res, piece, index) => {
                if (piece.startsWith(':')) {
                    //TODO исправить
                    res[piece] = {
                        index,
                    }
                }
                return res;
            }, {});
        }
        //TODO
    setHandler() {}
        // TODO req,res
    getHandler(path, method) {
        // console.log('method', method)
        const values = this.routes2;
        const route = values.find(route => {
            // console.log('route', route)
            // console.log('path.match(new RegExp(route.regPath))', new RegExp(route.reg))
            // console.log('path.match(new RegExp(route.regPath))', path.match(new RegExp(route.regPath)))
            const regResult = path.match(new RegExp(route.reg));
            return regResult ? regResult[0] === path : false;
        });
        if (!route) {
            return `Unknown path: ${path}`;
        }
        const a = this.routes.get(route.path)
            // console.log('a', a)
        return a[method].handler(a[method].keys);
    }
    get(path, handler) {
        //TODO вынести проверки, параметры и тд в отдельный метод, тут только передавать тип и сеттать в this.router
        let pathHandlers;
        Router.checkPath(path);
        const pathData = createRegExp(path);

        // console.log('pathData', pathData);
        // console.log('pathData', new RegExp(createRegExp(path).regPath, 'i'));
        // console.log('createRegExp2', createRegExp(path));
        // console.log('PATH', path);
        // console.log('\n\n\n')
        const params = Router.getRouteParams(path);
        const route = this.routes.get(path);
        pathHandlers = route ? route : {};
        this.routes.set(path, Object.assign(pathHandlers, {
            get: {
                handler,
                params, // убрать?
                regPath: pathData.regPath, //TODO деструктуризация
                keys: pathData.keys,
                path
            },

        }));
        this.routes2.push({ reg: pathData.regPath, path });
        // this.routes2.set(pathData.regPath)
        const a = this.routes.get('/index/:index');
        const testPath = createRegExp(path);
        // if (a) console.log('router', a.get.params)
        // console.log('routes', this.routes)
        // console.log('PATH', this.getHandler(path));
        return this;
    }
    post(path, handler) {
        let pathHandlers;
        Router.checkPath(path);
        const route = this.routes.get(path);
        pathHandlers = route ? route : {};
        this.routes.set(path, Object.assign(pathHandlers, {
            post: handler
        }));
        return this;
    }
    put(path, handler) {}
    delete(path, handler) {}
    patch(path, handler) {}
    options(path, handler) {}
    head(path, handler) {}
    all() {}
}

function createRegExp(path) {
    //TODO вынести параметры регулярок в отдельное свойство (i, g) ??
    let result = { regPath: '', keys: [] }
        // let reg = '';
    const regPathPrefix = '^';
    const regPathPostfix = '[\\/#\\?]?$';


    const pieces = path.split('/').filter(item => item.trim() !== '');
    //TODO мб массив, мб если нет параметров, то проще null проставить
    result.regPath = pieces.reduce((res, piece, index) => {
        if (piece.startsWith(':')) {
            // res += '[\/#\?]';
            // res += '[^\\/#\\?]+?';
            // res += '\\/[^/#\?]+?';
            result.keys.push({
                name: piece.slice(2),

            })
            res += '(?:\/([^\\/#\\?]+?))';
        } else {
            // res += piece;
            res += `\\/${piece}`;
        }
        return res;
    }, '');
    result.regPath = regPathPrefix + result.regPath + regPathPostfix;
    return result;
}
module.exports = Router;