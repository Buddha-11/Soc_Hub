const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth,checkOwner, checkUser } = require('./middleware/authMiddleware');
const eventRoutes = require('./routes/EventRoutes')
const app = express();
const dotenv = require("dotenv");
dotenv.config();
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');
const dbURI = process.env.MONGODB_URI;
// database connection
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

  app.use(express.urlencoded({extended:true}));

// routes
app.use('/events',requireAuth,eventRoutes);
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/geneticx', requireAuth, (req, res) => res.render('geneticx'));
app.use(authRoutes);
