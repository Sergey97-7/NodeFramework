const http = require('http');
const fs = require('fs');
require('dotenv').config();

const configuration = fs.readFileSync('./conf/server.json');


// const indexRouter = require('./routes/index');
// const userRoutes = require('./routes/user');
//TODO авторизация
//TODO безопасность
//TODO handle errors
// server.on()

/**
 * create http server
 */
const app = require('./app');
const server = http.createServer(app.reqListner);


const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`listening ${port}`)
});