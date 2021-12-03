// const recipes = require('../data/recipes');
const dbConnection = require('./mongoConnection');
const getCollectionFn = (collection) => {
let _col = undefined;

return async () => {
    if (!_col) {
    const db = await dbConnection();
    _col = await db.collection(collection);
    }

    return _col;
};
};
module.exports = {
    main : getCollectionFn('main'),
    recipes :getCollectionFn('recipes'),
    comments : getCollectionFn('comments'),
    users : getCollectionFn('users')
};