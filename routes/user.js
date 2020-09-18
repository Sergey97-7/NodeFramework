const a = require('../packages/Router');
const Router = new a()

Router
    .get('/', () => {
        console.log('success get user /');
        return 'success get user /';
    })
    .get('/user', () => {
        console.log('success get user /user');
        return 'success get user /user';
    })
    .post('/user', () => {
        console.log('success post user /user');
        return 'success post user /user';
    })

module.exports = Router;