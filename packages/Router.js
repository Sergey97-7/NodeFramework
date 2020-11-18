class Router {
    constructor() {
        this.routes = new Map();
        this.routes2 = [];
        this.rootPath = '';
        this.rootRegExpPath = '';
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

    getRouter(path) {
        const values = this.routes2;
        const route = values.find(route => {
            const regResult = path.match(new RegExp(route.reg));
            return regResult ? path.startsWith(regResult[0]) : false;
        });
        if (!route) {
            return `Unknown path: ${path}`;
        }
        const a = { router: this.routes.get(route.path).root.handler, pathPiece: route.path };
        return a;
    }
    addPathPiece(path) {
        this.rootPath = path;
        this.rootRegExpPath = createRegExp2(path, true).regPath;
    }

    //TODO method checkPath, подумать над Unknown path
    getHandler(path, method, query, headers, body, res, req) {
        const values = this.routes2;
        let regResult;
        const route = values.find(route => {
            // console.log('abc', this.rootRegExpPath + route.reg)
            regResult = path.match(new RegExp(this.rootRegExpPath + route.reg, 'i'));
            return regResult ? regResult[0] === path : false;
        });
        if (!route) {
            return `Unknown path: ${path}`;
        }
        const a = this.routes.get(route.path)
        const data = { path, params: regResult.groups, query, headers, body, res, req }
        return a[method].handler(data);
    }
    root(path, handler) {
        this.setHandler(path, handler, 'root')
        return this;
    }
    setHandler(path, handler, method) {
        let pathHandlers;
        Router.checkPath(path);
        const { regPath, keys } = createRegExp(path, method === 'root' ? true : false);
        const params = Router.getRouteParams(path);
        const route = this.routes.get(path);
        pathHandlers = route ? route : {};
        this.routes.set(path, Object.assign(pathHandlers, {
            [method]: {
                handler,
                params, // убрать?
                regPath,
                keys,
                path
            },

        }));
        this.routes2.push({ reg: regPath, path });
    }
    get(path, handler) {
        this.setHandler(path, handler, 'get')
        return this;
    }

    post(path, handler) {
        this.setHandler(path, handler, 'post')
        return this;
    }
    put(path, handler) {
        this.setHandler(path, handler, 'put')
        return this;
    }
    delete(path, handler) {
        this.setHandler(path, handler, 'delete')
        return this;
    }
    patch(path, handler) {
        this.setHandler(path, handler, 'patch')
        return this;
    }
    options(path, handler) {
        this.setHandler(path, handler, 'options')
        return this;
    }
    head(path, handler) {
        this.setHandler(path, handler, 'head')
        return this;
    }
    all() {}
}
// TODO сделать один механизм
function createRegExp(path, root) {
    let result = { regPath: '', keys: [] }
        // const regPathPrefix = '^';
    const regPathPostfix = '[\\/#\\?]?$';
    // const regParams = 'i';

    const pieces = path.split('/').filter(item => item.trim() !== '');
    result.regPath = pieces.reduce((res, piece, index) => {
        if (piece.startsWith(':')) {
            result.keys.push({
                name: piece.slice(1),

            })
            res += `(?:\/(?<${piece.slice(1)}>[^\\/#\\?]+?))`;
        } else {
            res += `\\/${piece}`;
        }
        return res;
    }, '');
    result.regPath = `${result.regPath}${root ? '' : regPathPostfix}`
        // result.regPath = new RegExp(`${regPathPrefix}${result.regPath}${root ? '' : regPathPostfix}`, regParams);
    return result;
}

function createRegExp2(path, root) {
    let result = { regPath: '', keys: [] }
    const regPathPrefix = '^';
    const regPathPostfix = '[\\/#\\?]?$';
    // const regParams = 'i';

    const pieces = path.split('/').filter(item => item.trim() !== '');
    result.regPath = pieces.reduce((res, piece, index) => {
        if (piece.startsWith(':')) {
            result.keys.push({
                name: piece.slice(1),

            })
            res += `(?:\/(?<${piece.slice(1)}>[^\\/#\\?]+?))`;
        } else {
            res += `\\/${piece}`;
        }
        return res;
    }, '');
    // result.regPath = new RegExp(`${regPathPrefix}${result.regPath}${root ? '' : regPathPostfix}`, regParams);
    result.regPath = `${regPathPrefix}${result.regPath}${root ? '' : regPathPostfix}`
    return result;
}
module.exports = Router;