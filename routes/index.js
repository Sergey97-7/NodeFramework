const a = require('../packages/Router');
const {
    getIndexPage
} = require('../libs/index');
const {
    sendResponse,
    sendPage
} = require('../libs/transmitter');
const Router = new a()
    //TODO рут роут указать в самом начале
Router
    .get('/', (data) => {
        sendPage(data.res, getIndexPage());
    })
    .get('/index', (data) => {
        console.log('success /index with params: ', data.params);
        return 'success /index';
    })
    .get('/ind/.*bc/:param1', (data) => {
        return JSON.stringify({
            rawPath: '/ind/.*bc/:param',
            path: data.path,
            param: data.params.param1,
            query: data.query,
            headers: data.headers
        })
        console.log('success /index with params: ', data.params);
        return 'success /index';
    })
    .get('/index/:index2', (data) => {
        console.log('success /index/:index with params: ', data.params);
        // console.log('a', a)
        return 'success /index/:index';
    })
    .get('/index/:index2/:index3', (data) => {
        console.log('success /index/:index/:index2 with params: ', data.params);
        // console.log('a', a)
        return 'success /index/:index/:index2';
    })
    .get('/index/abc:index2', (data) => {
        console.log('success /index/:index/:index2 with params: ', data.params);
        // console.log('a', a)
        return 'success /index/:index/:index2';
    })
module.exports = Router;