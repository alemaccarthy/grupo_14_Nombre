const express = require('express');
const path = require('path'); 
const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, '/views/products'),
    path.join(__dirname, '/views/main'),
    path.join(__dirname, '/views/user')
])

app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use('/main', mainRoutes);
app.use('/products', productsRoutes);
app.use('/user', usersRoutes);


app.listen(3000, () => {
    console.log('🎧 Escuchando puerto 3000 🎧');
})
