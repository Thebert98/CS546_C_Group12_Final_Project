const userRoutes = require('./main');
const commentroutes = require('./comments');
const constructorMethod = (app) => {
app.use('/', userRoutes);
app.use('/comments', commentroutes);
app.use('*', (req, res) => {
    res.sendStatus(404);
});
};

module.exports = constructorMethod;
