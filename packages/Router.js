class Router {
    constructor() {
        this.routes = new Map();
        this.routeKeys = [];
        this.rootPath = '';
        this.rootRegExpPath = '';
    }

    static checkPath(path) {
        if (typeof path !== 'string') {
            throw new Error('Path must be a string');
        }
        return path;
    }

    addPathPiece(path) {
        this.rootPath = path;
        this.rootRegExpPath = createRegExp(path, true).regPath;
    }

    //TODO method checkPath, подумать над Unknown path
    getHandler(path, method, query, headers, body, res, req) {
        let regResult;
        const route = this.routeKeys.find(route => {
            regResult = path.match(new RegExp(this.rootRegExpPath + route.reg, 'i'));
            return regResult ? regResult[0] === path : false;
        });
        if (!route) {
            return `Unknown path: ${path}`;
        }
        const dataForHandler = { path, params: regResult.groups, query, headers, body, res, req }
        return this.routes.get(route.path)[method].handler(dataForHandler);
    }
    setHandler(path, handler, method) {
        let pathHandlers;
        Router.checkPath(path);
        const { regPath, keys } = createRegExp(path);
        const route = this.routes.get(path);
        pathHandlers = route ? route : {};
        this.routes.set(path, Object.assign(pathHandlers, {
            [method]: {
                handler,
                regPath,
                keys,
                path
            },

        }));
        this.routeKeys.push({ reg: regPath, path });
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

function createRegExp(path, root) {
    const result = { regPath: '', keys: [] }
    const regPathPrefix = '^';
    const regPathPostfix = '[\\/#\\?]?$';
    const mainPath = path
        .split('/')
        .filter(pathPiece => pathPiece.trim() !== '')
        .reduce((res, pathPiece) => {
            if (pathPiece.startsWith(':')) {
                result.keys.push({
                    name: pathPiece.slice(1),

                })
                res += `(?:\/(?<${pathPiece.slice(1)}>[^\\/#\\?]+?))`;
            } else {
                res += `\\/${pathPiece}`;
            }
            return res;
        }, '');
    result.regPath = `${root ? regPathPrefix : ''}${mainPath}${root ? '' : regPathPostfix}`
    return result;
}

module.exports = Router;