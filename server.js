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



const port = process.env.PORT
app.listen(port, () => console.log('Server Started on port:',port))
