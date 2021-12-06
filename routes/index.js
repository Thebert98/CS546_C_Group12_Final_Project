const userRoutes = require('./main');
<<<<<<< HEAD
const recipeRoutes = require('./recipes');
// const usersRoutes = require('./users');
const commentRoutes = require('./comments');

const constructorMethod = (app) => {
app.use('/', userRoutes);
app.use('/recipe', recipeRoutes);
app.use('/recipe/comments',commentRoutes);
// app.use('/',userRoutes);

=======
>>>>>>> 2128984552900e4698da8d6bab16b5b995b0ed8c
app.use('*', (req, res) => {
    res.sendStatus(404);
});
};

module.exports = constructorMethod;
