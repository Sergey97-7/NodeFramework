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
    .get('/index/:index2', () => {
        console.log('success /index/:index');
        return 'success /index/:index';
    })
module.exports = Router;