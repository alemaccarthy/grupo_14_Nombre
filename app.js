const express = require('express');
const path = require('path'); 
const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const methodOverride = require('method-override');
const app = express();
<<<<<<< HEAD
/* const logMiddleware = require('./middlewares/logMiddleware'); */
=======
// const logMiddleware = require('./middlewares/logMiddleware');
const Middleware404 = require('./middlewares/404Middleware');
>>>>>>> 393e4a055fc06c2e88ca4276ab620e007dd55f7c

app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, '/views/'),
    path.join(__dirname, '/views/products'),
    path.join(__dirname, '/views/user'),
    path.join(__dirname, '/views/errors')
])

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
<<<<<<< HEAD
/* app.use(logMiddleware); */
=======
// app.use(logMiddleware);
>>>>>>> 393e4a055fc06c2e88ca4276ab620e007dd55f7c

//  ROUTES
app.use(mainRoutes);
app.use('/products', productsRoutes);
app.use('/user', usersRoutes);

app.use(Middleware404);

app.listen(3000, () => {
    console.log('🎧 Escuchando puerto http://localhost:3000 🎧');
})
