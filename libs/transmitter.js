function sendResponse(res, data, statusCode = '200') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(JSON.stringify(data));
    return res;
}

function sendPage(res, data, statusCode = '200') {
    if (data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
    }
    return res;
}
module.exports = {
    sendResponse,
    sendPage
};