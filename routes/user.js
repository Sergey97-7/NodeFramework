const a = require('../packages/Router');
const Router = new a()

Router
    .get('/user', () => {
        console.log('success get user');
    })
    .post('/user', () => {
        console.log('success post user');
    })

module.exports = Router;