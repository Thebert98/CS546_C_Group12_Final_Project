const userRoutes = require('./main');

const recipeRoutes = require('./recipes');
const usersRoutes = require('./users');
const commentRoutes = require('./comments');

const constructorMethod = (app) => {
app.use('/', userRoutes);
app.use('/recipe', recipeRoutes);
app.use('/recipe/comments',commentRoutes);
app.use('/users',usersRoutes);


app.use('*', (req, res) => {
    res.sendStatus(404);
});
};

module.exports = constructorMethod;
