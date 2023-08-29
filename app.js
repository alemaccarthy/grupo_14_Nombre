const express = require('express');
const path = require('path'); 
const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const methodOverride = require('method-override');
const morgan = require('morgan');
const middlewares = require('./middlewares/middlewares');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const apiProductsRoutes = require('./routes/api/productRoutes');
const apiUsersRoutes = require('./routes/api/usersRoutes1');


const app = express();

app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, '/views/'),
    path.join(__dirname, '/views/products'),
    path.join(__dirname, '/views/user'),
    path.join(__dirname, '/views/errors')
])


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
// app.use(cookieParser());
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(session({
    secret: "pan, clave secreta, lechuga, tomate, mayonesa, pan",
    resave: false,
    saveUninitialized: false
}));

app.use(middlewares.userLoggedMiddleware);
app.use(middlewares.rememberMiddleware);
app.use(middlewares.header);
app.use(middlewares.brandSelector);

//  ROUTES
app.use(mainRoutes);
app.use('/products', productsRoutes);
app.use('/user', usersRoutes);

app.use('/api/products', apiProductsRoutes);
app.use('/api/user', apiUsersRoutes);

app.use(middlewares.middleware404);

app.listen(3000, () => {
    console.log('🎧 Escuchando puerto http://localhost:3000 🎧');
})
