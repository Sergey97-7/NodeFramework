const a = require('../packages/Router');
const Router = new a()
const {
    getUsers,
    getUser,
} = require('../libs/user');
const {
    sendResponse,
    sendPage
} = require('../libs/transmitter');

Router
    .get('/', () => {
        console.log('success get user /');
        return 'success get user /';
    })
    .get('/users', (data) => {
        console.log('success get user /user');
        sendResponse(data.res, getUsers())
        return 'success get user /user';
    })
    .get('/user/:user', (data) => {
        console.log('success post user /user');
        sendResponse(data.res, getUser(data.params.user))
        return 'success post user /user';
    })

module.exports = Router;