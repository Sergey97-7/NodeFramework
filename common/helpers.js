function ipv4(ip) {
    return ip.toString().substring(ip.lastIndexOf(':') + 1);
}
module.exports = {
    ipv4
}