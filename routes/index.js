const a = require('../packages/Router');
const Router = new a()
    //TODO рут роут указать в самом начале
Router
    .get('/', () => {
        console.log('success /');
        return 'success /';
    })
    .get('/index', () => {
        console.log('success /index');
        return 'success /index';
    })
    .get('/index/:index2', (a) => {
        console.log('success /index/:index');
        console.log('a', a)
        return 'success /index/:index';
    })
    .get('/index/:index2/:index2', (a) => {
        console.log('success /index/:index/:index2');
        console.log('a', a)
        return 'success /index/:index/:index2';
    })
module.exports = Router;