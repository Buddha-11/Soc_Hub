const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth,checkOwner, checkUser } = require('./middleware/authMiddleware');
const eventRoutes = require('./routes/EventRoutes')
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://snehal:test@cc.8hdyetj.mongodb.net/test?retryWrites=true&w=majority&appName=CC';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

  app.use(express.urlencoded({extended:true}));

// routes
app.use('/events',eventRoutes);
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/geneticx', requireAuth, (req, res) => res.render('geneticx'));
app.use(authRoutes);