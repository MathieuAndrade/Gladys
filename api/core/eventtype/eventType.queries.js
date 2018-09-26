
module.exports = {
    getByCode: `SELECT * FROM eventtype WHERE code = ?;`,
    getByCategory: 'SELECT * FROM eventtype WHERE category = ?;',
    get: 'SELECT * FROM eventtype;',
    getEventTypeUser: 'SELECT * FROM eventtype WEHRE user = ?;',
    delete: 'DELETE FROM eventtype WHERE id = ?;' 
};