function getUsers() {
    return [{ name: 'name', age: 'age' }, { name: 'Serg', age: '111' }];
}

function getUser(data) {
    return { name: data, age: '111' };
}
module.exports = {
    getUsers,
    getUser
}