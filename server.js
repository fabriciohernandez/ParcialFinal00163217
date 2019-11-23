require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const app = express()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , useUnifiedTopology: true })
const db = mongoose.connection
db.on('error',(error)=> console.log(error))
db.once('open',()=> console.log('Successful connected to database'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));

//Define views engine
app.set('views', './views');
app.set('view engine', 'pug');

//res.render('index');

const userRouter = require('./routes/canal')
app.use('/canal',userRouter)

const localRouter = require('./routes/FullRestFul')
app.use('/onlyRestFul',localRouter)

const welcomRouter = require('./routes/welcome')
app.use('/',welcomRouter)

const port = process.env.PORT
app.listen(port, () => console.log('Server Started on port:',port))

app.use(function(req, res, next){
    res.status(404);
  
    // respond with html page
    if (req.accepts('html')) {
      res.render('404', { title: 'No encontrado' });
      return;
    }
  
    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
  
    // default to plain-text. send()
    res.type('txt').send('Not found');
  });
  
  app.use(function(req, res, next){
    res.status(500);
  
    // respond with html page
    if (req.accepts('html')) {
      res.render('500', { title: 'No encontrado' });
      return;
    }
  
    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
  
    // default to plain-text. send()
    res.type('txt').send('Not found');
  });

 
  
  
  module.exports = app;